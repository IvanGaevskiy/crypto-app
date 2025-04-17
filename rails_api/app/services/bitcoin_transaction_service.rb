require "net/http"
require "uri"
require "json"
require "bitcoin"

Bitcoin.chain_params = BITCOIN_NETWORK

class BitcoinTransactionService
  def initialize(recipient_address, amount_to)
    @recipient_address = recipient_address
    @key = Bitcoin::Key.from_base58(ENV["EXCHANGE_WIF"])
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
    tx.add_out(Bitcoin::TxOut.value_to_address(change, ENV["EXCHANGE_WIF"])) if change > 0

    utxos.each_with_index do |utxo, index|
      script = Bitcoin::Script.parse_from_addr(ENV["EXCHANGE_WIF"])
      sig_hash = tx.sighash_for_input(index, script)
      signature = @key.sign(sig_hash) + [Bitcoin::SIGHASH_TYPE[:all]].pack("C")
      script_sig = Bitcoin::Script.to_p2pkh_sig_script(signature, @key.pubkey.htb)
      tx.in[index].script_sig = script_sig
    end

    tx.to_payload.bth
  end

  private

  def fetch_utxos
    url = URI("#{ENV["MEMPOOL_API"]}/address/#{ENV["EXCHANGE_WIF"]}/utxo")
    res = Net::HTTP.get_response(url)
    JSON.parse(res.body)
  rescue => e
    Rails.logger.error("Ошибка в запросе UTXO: #{e.message}")
    []
  end

  def to_satoshi(amount)
    (amount * "100000000".to_d).to_i
  end

  def estimate_tx_fee(input_count, output_count = 2, fee_per_byte = 2)
    size = input_count * 148 + output_count * 34 + 10
    size * fee_per_byte
  end
end
