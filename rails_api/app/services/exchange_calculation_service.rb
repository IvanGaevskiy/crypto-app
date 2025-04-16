require "bigdecimal"
require "bigdecimal/util"

class ExchangeCalculatorService
  def self.get_exchanger_fee(amount_from)
    amount_from.to_d * EX_FEE.to_d
  end

  def self.get_miners_fee(currency_from, rate)
    currency_from == "BTC" ? TX_FEE.to_d : rate.to_d * TX_FEE.to_d
  end

  def self.get_amount_after_fees(currency_from, amount_from, rate)
    exchanger_fee = get_exchanger_fee(amount_from)
    miners_fee = get_miners_fee(currency_from, rate)

    all_fees = exchanger_fee + miners_fee
    (amount_from - all_fees).round(8)
  end
end
