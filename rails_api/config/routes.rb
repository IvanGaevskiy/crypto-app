Rails.application.routes.draw do
  namespace :api do
    post "/create", to: "exchange_transactions#create"
  end
end
