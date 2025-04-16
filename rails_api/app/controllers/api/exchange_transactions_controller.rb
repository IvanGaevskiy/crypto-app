class Api::ExchangeTransactionsController < ApplicationController
  def create
    exchange_transaction = ExchangeTransaction.new(transaction_params)

    exchange_rates_params.each do |rate_params|
      exchange_transaction.exchange_rate.build(rate_params)
    end

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
    params.permit(:recipient_address, :email, currency_amounts: [:currency, :amount])
  end

  def exchange_rates_params
    params.require(:exchange_rates).map do |exchange_rate|
      exchange_rate.permit(:currency_from, :currency_to, :rate)
    end
  end

  def agreements_params
    params.require(:agreetment_params).map do |agreetment_param|
      agreetment_param.permit(:agreement_type, :approved)
    end
  end
end
