require "json"
require "bitcoin"

Bitcoin.chain_params = BITCOIN_NETWORK

class BitcoinTransactionService
  EXCHANGE_WIF = ENV.fetch("EXCHANGE_WIF")

  def initialize(recipient_address, amount_to)
    @recipient_address = recipient_address
    @key = Bitcoin::Key.from_base58(EXCHANGE_WIF)
    @amount_to = to_satoshi(amount_to)
  end

  def create_transaction
    utxos = fetch_utxos
    return nil if utxos.empty?

    total_input = utxos.sum { |u| u["value"] }
    fee = estimate_tx_fee(utxos.count)
    return nil if total_input < @amount_to + fee
    change = total_input - @amount_to - fee
    return nil if change <= 0

    tx = Bitcoin::Tx.new

    utxos.each do |utxo|
      tx.add_in(
        Bitcoin::TxIn.new(
          prev_out: [utxo["txid"]].pack("H*").reverse + [utxo["vout"]].pack("V"),
          script_sig: "",
          sequence: "\xff\xff\xff\xff",
        )
      )
    end

    tx.add_out(Bitcoin::TxOut.value_to_address(@amount_to, @recipient_address))
    tx.add_out(Bitcoin::TxOut.value_to_address(change, EXCHANGE_WIF)) if change > 0

    utxos.each_with_index do |utxo, index|
      script = Bitcoin::Script.parse_from_addr(EXCHANGE_WIF)
      sig_hash = tx.sighash_for_input(index, script)
      signature = @key.sign(sig_hash) + [Bitcoin::SIGHASH_TYPE[:all]].pack("C")
      script_sig = Bitcoin::Script.to_p2pkh_sig_script(signature, @key.pubkey.htb)
      tx.in[index].script_sig = script_sig
    end

    tx.to_payload.bth
  end

  private

  def fetch_utxos
    mempool_api = ENV.fetch("MEMPOOL_API")

    response = Faraday.get("#{mempool_api}/address/#{EXCHANGE_WIF}/utxo")

    if !response.success
      Rails.logger.error("Ошибка в запросе UTXO: #{response.status} #{response.body}")
    end

    JSON.parse(response.body)
  end

  def to_satoshi(amount)
    (amount * "100000000".to_d).to_i
  end

  def estimate_tx_fee(input_count, output_count = 2, fee_per_byte = 2)
    size = input_count * 148 + output_count * 34 + 10
    size * fee_per_byte
  end
end
