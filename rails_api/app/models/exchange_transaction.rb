class ExchangeTransaction < ApplicationRecord
  belongs_to :agreements
  belongs_to :exchange_rate
  has_many :currency_amounts, dependent: :destroy

  accepts_nested_attributes_for :currency_amounts

  validates :recipient_address, presence: true
  validates :email, format: URI::MailTo::EMAIL_REGEXP
end
