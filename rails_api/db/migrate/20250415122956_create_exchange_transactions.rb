class CreateExchangeTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :exchange_transactions do |t|
      t.string :recipient_address
      t.string :email

      t.references :agreements, null: false, foreign_key: true
      t.references :exchange_rate, null: false, foreign_key: true

      t.timestamps
    end
  end
end
