class CreateAgreements < ActiveRecord::Migration[8.0]
  def change
    create_table :agreements do |t|
      t.string :agreement_type
      t.boolean :approved

      t.references :exchange_transaction, null: false, foreign_key: true

      t.timestamps
    end
  end
end
