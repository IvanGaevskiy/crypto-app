require "json"

class BlockcypherService
  def initialize(raw_tx_hex)
    @raw_tx = raw_tx_hex
    @token = ENV.fetch("BLOCKCYPHER_TOKEN")  #ВНИМАНИЕ получите токен на https://accounts.blockcypher.com :contentReference[oaicite:1]{index=1}
  end

  def decode
    connection = Faraday.new do |conn|
      conn.headers["Content-Type"] = "application/json"
    end

    response = connection.post("#{BLOCKCYPHER_BTC_API}?token=#{@token}", { tx: @raw_tx }.to_json)

    if !response.success?
      raise "Ошибка при декодировании hex-транзакции: #{response.status} #{response.reason_phrase}"
    end

    Rails.logger.info("Hex-транзакция успешно декодирована: #{response.body}")
    JSON.parse(response.body)
  end
end
