class BlockcypherService
  def initialize(raw_tx_hex)
    @raw_tx = raw_tx_hex
    @token = ENV.fetch("BLOCKCYPHER_TOKEN")  #ВНИМАНИЕ получите токен на https://accounts.blockcypher.com :contentReference[oaicite:1]{index=1}
  end

  def decode
    uri = URI("#{BLOCKCYPHER_API}?token=#{@token}")
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true

    req = Net::HTTP::Post.new(uri, { "Content-Type" => "application/json" })
    req.body = { tx: @raw_tx }.to_json

    res = http.request(req)
    raise "BlockCypher error: #{res.code} #{res.message}" if !res.is_a?(Net::HTTPSuccess)

    JSON.parse(res.body)
  end
end
