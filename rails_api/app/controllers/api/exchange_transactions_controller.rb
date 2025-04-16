class Api::ExchangeTransactionsController < ApplicationController
  def create
    exchange_transaction = ExchangeTransaction.new(transaction_params)

    agreetments_params.each do |agreetment_param|
      exchange_transaction.agreetment.build(agreetment_param)
    end

    if exchange_transaction.save
      render json: { status: "success", transaction: exchange_transaction.as_json }
    else
      render json: { status: "error", errors: exchange_transaction.errors.full_messages }, status: :unprocessable_entity
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
end
