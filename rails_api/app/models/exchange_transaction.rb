require "bigdecimal"
require "bigdecimal/util"

class ExchangeTransaction < ApplicationRecord
  before_validation :set_default_status, on: :create

  has_many :agreements, dependent: :destroy

  validates :currency_from, presence: true, inclusion: { in: CYRRENCY_FROM_TYPE }
  validates :currency_to, presence: true, inclusion: { in: CYRRENCY_TO_TYPE }
  validates :amount_from,
            presence: true,
            numericality: {
              greater_than: MIN_AMOUNT.to_d, less_than_or_equal_to: MAX_AMOUNT.to_d
            }
  validate :amount_to_equal_amount_from_after_fees
  validate :recipient_address_validation
  validates :email, format: URI::MailTo::EMAIL_REGEXP
  validates :rate, numericality: { greater_than: 0 }
  validates :recorded_at, presence: true, datetime: true

  def amount_to_equal_amount_from_after_fees
    return if amount_from.blank? || currency_from.blank? || rate.blank?
    return errors.add(:amount_to, "Поле пустое") if amount_to.blank?

    amount_after_fees = ExchangeCalculationService.get_amount_after_fees(
      currency_from, amount_from, rate
    )

    if amount_to.to_d.round(8) != amount_after_fees.round(8)
      errors.add(
        :amount_to,
        "Сумма получения с учётом коммиссий не соответствует расчётам"
      )
    end
  end
  puts Time.now
  def recipient_address_validation
    if !recipient_address.is_a?(String)
      errors.add(:recipient_address,
                 "Должен быть строкой")
    end

    if !BitcoinValidationService.adress_valid?(recipient_address)
      errors.add(:recipient_address,
                 "Не соответствует форматам P2PKH, P2SH, P2WPHK")
    end
  end

  def set_default_status
    self.status ||= "processing"
  end
end
