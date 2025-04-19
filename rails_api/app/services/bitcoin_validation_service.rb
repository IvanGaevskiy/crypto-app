require "bitcoin"

class BitcoinValidationService
  Bitcoin.chain_params = BITCOIN_NETWORK

  def self.adress_valid?(address)
    Bitcoin::Script.parse_from_addr(address)
    true
  rescue Bitcoin::Script::ParseError
    false
  end
end
