require "bitcoin"

class BitcoinService
  Bitcoin.network = :testnet

  def self.valid_bitcoin_address?(address)
    Bitcoin::Script.parse_from_addr(address) != nil
  rescue
    false
  end
end
