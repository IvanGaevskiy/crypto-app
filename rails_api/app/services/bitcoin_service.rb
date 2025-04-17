require "bitcoin"

class BitcoinValidationService
  Bitcoin.network = BITCOIN_NETWORK

  def self.address_valid?(address)
    Bitcoin::Script.parse_from_addr(address) != nil
  rescue
    false
  end
end
