class CreateCurrencyAmounts < ActiveRecord::Migration[8.0]
  def change
    create_table :currency_amounts do |t|
      t.references :exchange_transaction, null: false, foreign_key: true
      t.string :currency
      t.decimal :amount

      t.timestamps
    end
  end
end
