class CurrencyAmount < ApplicationRecord
  belongs_to :exchange_transaction

  validates :currency, presence: true, inclusion: { in: %w[USDT BTC] }
  validates :amount, presence: true, numericality: { greater_than: 0 }
end
