import axios, { AxiosResponse } from 'axios'

type ResponseCurrency = {
  symbol: string
  price_usd: string
}

export type ResponseGetCurrencies = Record<string, { price_usd: string }>

export const getCurrencies = async (): Promise<ResponseGetCurrencies> => {
  const {data}: AxiosResponse<ResponseCurrency[]> = await axios.get(
    'https://api.coinlore.net/api/ticker/?id=90,518'
  )
  const currencies: ResponseGetCurrencies = {}
  data.forEach((currency) => {
    currencies[currency.symbol] = { price_usd: currency.price_usd }
  })
  return currencies
}
