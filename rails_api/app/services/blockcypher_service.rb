require "json"

class BlockcypherService
  def initialize(raw_tx_hex)
    @raw_tx = raw_tx_hex
    @token = ENV.fetch("BLOCKCYPHER_TOKEN")  #ВНИМАНИЕ получите токен на https://accounts.blockcypher.com :contentReference[oaicite:1]{index=1}
  end

  def decode
    connection = Faraday.new(headers: { "Content-Type" => "application/json" })

    response = connection.post(
      "#{BLOCKCYPHER_BTC_API}?token=#{@token}",
      { tx: @raw_tx }.to_json
    )

    if !response.success?
      raise "BlockCypher error: #{response.status} #{response.reason_phrase}"
    end

    JSON.parse(response.body)
  end
end
