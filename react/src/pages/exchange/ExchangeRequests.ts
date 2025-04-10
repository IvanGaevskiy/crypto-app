import axios, { AxiosResponse } from 'axios';

type ResponseCurrency = {
  id: string;
  symbol: string;
  name: string;
  nameid: string;
  rank: number;
  price_usd: string;
  percent_change_24h: string;
  percent_change_1h: string;
  percent_change_7d: string;
  price_btc: string;
  market_cap_usd: string;
  volume24: number;
  volume24a: number;
  csupply: string;
  tsupply: string;
  msupply: string;
}

export type ResponseGetCurrencies = Record<string, { price_usd: string }>

export const GET_СURRENCIES = (): Promise<ResponseGetCurrencies> => {
  return axios.get('https://api.coinlore.net/api/ticker/?id=90,518')
    .then(function (response:  AxiosResponse<ResponseCurrency[]>) {
      const currencies: ResponseGetCurrencies = {};

      response.data.forEach((currency) => {
        currencies[currency.symbol] = { price_usd: currency.price_usd };
      });
      return currencies;
    })
    .catch(function (error: unknown) {
      console.log(error);
      throw error;
    })
    .finally(function () {
      console.log('GET_СURRENCIES completed');
    });
}


  
