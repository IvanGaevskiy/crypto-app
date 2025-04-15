class ExchangeRate < ApplicationRecord
  has_many :exchange_transactions

  validates :from_currency, :to_currency, presence: true
  validates :rate, numericality: { greater_than: 0 }
  validates :recorded_at, presence: true
end
