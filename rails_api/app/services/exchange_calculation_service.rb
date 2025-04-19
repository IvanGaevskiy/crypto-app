require "bigdecimal"
require "bigdecimal/util"

class ExchangeCalculationService
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
    amount_after_fees = amount_from - all_fees
    (amount_after_fees / rate).abs
  end
end
