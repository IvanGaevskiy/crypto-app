class Api::ExchangeTransactionsController < ApplicationController
  def create
    exchange_transaction = nil

    ExchangeTransaction.transaction do
      exchange_transaction = ExchangeTransaction.create!(transaction_params)
      exchange_transaction.agreements.create!(agreements_params)
    end

    if !exchange_transaction.persisted?
      render json: {
        status: "error",
        errors: "Ошибка входных данных: #{exchange_transaction.errors.full_messages}"
      }, status: :unprocessable_entity
    end

    transaction_service = init_transaction(exchange_transaction)
    transaction_service.create_transaction
    puts "transaction_service.create_transaction hex-------------------------------------"
    puts transaction_service.create_transaction
    puts "transaction_service.decode"
    puts transaction_service.decode
    # puts "exchange_transaction.as_json"
    # puts exchange_transaction.as_json
    transaction_service.broadcast_transaction
    exchange_transaction.update(status: "success")

    render json: exchange_transaction.as_json # raw_tx_hex: transaction
  end

  private

  def transaction_params
    params.permit(:recipient_address,
                  :email,
                  :currency_from,
                  :currency_to,
                  :amount_from,
                  :amount_to,
                  :rate,
                  :recorded_at)
  end

  def agreements_params
    params.permit(agreements: %i[agreement_type approved])[:agreements]
  end

  def init_transaction(exchange_transaction, service_class = BitcoinTransactionService)
    recipient_address = exchange_transaction.recipient_address
    amount_to = exchange_transaction.amount_to

    service_class.new(recipient_address, amount_to)
  end
end
