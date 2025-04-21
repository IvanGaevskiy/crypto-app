import axios, { AxiosResponse } from 'axios'
import { SERVER_HOST } from '../../constanst'

type ResponseCurrency = {
  symbol: string
  price_usd: string
}

export type ResponseGetCurrencies = Record<string, { price_usd: string }>

type Agreement = {
  agreement_type: 'KYC' | 'AML'
  approved: boolean
}

type RequestCreateTransaction = {
  currency_from: string
  amount_from: string
  currency_to: string
  amount_to: string
  rate: string
  recorded_at: string
  recipient_address: string
  email: string
  agreements: Agreement[]
}

type ResponseCreateTransaction = {
  id: number
  currency_from: string
  amount_from: string
  currency_to: string
  amount_to: string
  rate: string
  recorded_at: string
  recipient_address: string
  email: string
  status: 'processing' | 'completed' | 'failed'
  created_at: string
  updated_at: string
}

export const getCurrencies = async (): Promise<ResponseGetCurrencies> => {
  const { data }: AxiosResponse<ResponseCurrency[]> = await axios.get(
    'https://api.coinlore.net/api/ticker/?id=90,518'
  )
  const currencies: ResponseGetCurrencies = {}
  data.forEach((currency) => {
    currencies[currency.symbol] = { price_usd: currency.price_usd }
  })
  return currencies
}

export const createTransaction = async (
  request: RequestCreateTransaction
): Promise<ResponseCreateTransaction> => {
  const { data }: AxiosResponse<ResponseCreateTransaction> = await axios.post(
    `${SERVER_HOST}/create`,
    request
  )

  return data
}
