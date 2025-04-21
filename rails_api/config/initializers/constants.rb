EX_FEE = "0.03"
TX_FEE = "0.000006"
MIN_AMOUNT = "11"
MAX_AMOUNT = "30"
CYRRENCY_FROM_TYPE = %w[USDT]
CYRRENCY_TO_TYPE = %w[BTC]
BITCOIN_NETWORK = :testnet
MEMPOOL_API = Rails.env.production? ? "https://mempool.space/api" : "https://mempool.space/testnet/api"

BLOCKCYPHER_NETWORK = Rails.env.production? ? "main" : "signet"
BLOCKCYPHER_BTC_API = "https://api.blockcypher.com/v1/btc/#{BLOCKCYPHER_NETWORK}/txs/decode"
