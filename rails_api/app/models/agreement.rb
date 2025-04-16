class Agreement < ApplicationRecord
  belongs_to :exchange_transaction, optional: true

  AGREEMENT_TYPES = %w[KYC AML]

  validates :agreement_type, presence: true, inclusion: { in: AGREEMENT_TYPES }
  validates :approved, inclusion: { in: [true] }
end
