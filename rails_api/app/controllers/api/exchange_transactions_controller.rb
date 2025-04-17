class Api::ExchangeTransactionsController < ApplicationController
  def create
    exchange_transaction = ExchangeTransaction.new(transaction_params, success: "processing")

    agreetments_params.each do |agreetment_param|
      exchange_transaction.agreetment.build(agreetment_param)
    end

    if exchange_transaction.save
      begin
        raw_tx_hex = create_transaction(exchange_transaction)

        decoded_hex = BlockcypherService.new(raw_hex).decode
        puts decoded_hex

        exchange_transaction.update(success: "success")

        render json: {
                 status: "success",
                 transaction: exchange_transaction.as_json,
                 raw_tx_hex: raw_tx_hex,
               }
      rescue => e
        exchange_transaction.update(success: "failed")
        render json: {
                 status: "error",
                 message: "Ошибка при сборке транзакции: #{e.message}",
               }, status: :unprocessable_entity
      end
    else
      exchange_transaction.update(success: "failed")
      render json: {
        status: "error",
        errors: exchange_transaction.errors.full_messages,
      }, status: :unprocessable_entity
    end
  end

  private

  def transaction_params
    params.permit(:recipient_address,
                  :email,
                  :currency_from,
                  :currency_to,
                  :amount_from,
                  :amount_to,
                  :rate)
  end

  def agreements_params
    params.require(:agreetments).map do |agreetment|
      agreetment.permit(:agreement_type, :approved)
    end
  end

  def create_transaction(exchange_transaction, service_class = BitcoinTransactionService)
    recipient_address = exchange_transaction.recipient_address
    amount_satoshi = exchange_transaction.amount_to

    btc_service = service_class.new(recipient_address, amount_satoshi)
    btc_service.create_transaction
  end
end
