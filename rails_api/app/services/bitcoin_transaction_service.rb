require "json"
require "bitcoin"

class BitcoinTransactionService
  Bitcoin.chain_params = BITCOIN_NETWORK

  EXCHANGE_ADDRESS = ENV.fetch("EXCHANGE_ADDRESS")
  EXCHANGE_PRIVATE_KEY = ENV.fetch("EXCHANGE_PRIVATE_KEY")
  EXCHANGE_PUB_KEY = ENV.fetch("EXCHANGE_PUB_KEY")

  def initialize(recipient_address, amount_to)
    @recipient_address = recipient_address
    @key = Bitcoin::Key.from_wif(EXCHANGE_PRIVATE_KEY)
    @amount_to = to_satoshi(amount_to)
    @raw_tx_hex = ""
  end

  def create_transaction
    utxos = fetch_utxos
    return nil if utxos.empty?

    total_input = utxos.sum { |u| u["value"] }
    fee = estimate_tx_fee(utxos.count)
    return nil if total_input < @amount_to + fee

    change = calculate_change(total_input, fee)
    return nil if change <= 0

    tx = Bitcoin::Tx.new
    tx.marker = 0
    tx.flag = 1

    add_inputs_to_tx(tx, utxos)
    add_outputs_to_tx(tx, change)
    sign_transaction(tx, utxos)

    @raw_tx_hex = tx.to_payload.bth
  end

  def broadcast_transaction
    response = Faraday.post("#{MEMPOOL_API}/tx") do |request|
      request.headers["Content-Type"] = "text/plain"
      request.body = @raw_tx_hex
    end

    raise "Ошибка при бродкасте транзакции: #{response.body}" if !response.success?

    Rails.logger.info("Транзакция отправлена! TXID: #{response.body}")
    response.body # txid
  end

  def decode
    Bitcoin::Tx.parse_from_payload(@raw_tx_hex.htb, strict: true).to_h
  end

  private

  def calculate_change(total_input, fee)
    total_input - @amount_to - fee
  end

  def add_inputs_to_tx(tx, utxos)
    utxos.each do |utxo|
      out_point = Bitcoin::OutPoint.from_txid(utxo["txid"], utxo["vout"])
      tx.in << Bitcoin::TxIn.new(out_point: out_point)
    end
  end

  def add_outputs_to_tx(tx, change)
    recipient_script = Bitcoin::Script.parse_from_addr(@recipient_address)
    tx.out << Bitcoin::TxOut.new(value: @amount_to, script_pubkey: recipient_script)

    if change > 0
      exchange_script = Bitcoin::Script.parse_from_addr(EXCHANGE_ADDRESS)
      tx.out << Bitcoin::TxOut.new(value: change, script_pubkey: exchange_script)
    end
  end

  def sign_transaction(tx, utxos)
    utxos.each_with_index do |utxo, i|
      utxo_script = Bitcoin::Script.to_p2pkh(@key.hash160)

      sig_hash = tx.sighash_for_input(i, utxo_script, sig_version: :witness_v0, amount: utxo["value"])
      signature = @key.sign(sig_hash) + [Bitcoin::SIGHASH_TYPE[:all]].pack("C")

      tx.in[i].script_witness.stack << signature
      tx.in[i].script_witness.stack << EXCHANGE_PUB_KEY.htb
    end
  end

  def fetch_utxos
    response = Faraday.get("#{MEMPOOL_API}/address/#{EXCHANGE_ADDRESS}/utxo")

    raise "Ошибка в запросе UTXO: #{response.status} #{response.body}" if !response.success?

    Rails.logger.info("UTXOS успешно получены: #{response.body}")
    JSON.parse(response.body)
  end

  def to_satoshi(amount)
    (amount * "100000000".to_d).to_i
  end

  def estimate_tx_fee(input_count, output_count = 2, fee_per_byte = 2)
    size = (input_count * 148) + (output_count * 34) + 10
    size * fee_per_byte
  end
end
