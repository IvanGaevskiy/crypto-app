class CreateExchangeTransactions < ActiveRecord::Migration[8.0]
  def change
    create_table :exchange_transactions do |t|
      t.string :currency_from
      t.decimal :amount_from
      t.string :currency_to
      t.decimal :amount_to
      t.decimal :rate
      t.datetime :recorded_at
      t.string :recipient_address
      t.string :email
      t.string :status

      t.timestamps
    end
  end
end
