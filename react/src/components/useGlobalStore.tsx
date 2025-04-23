import { create } from 'zustand';
import type { ResponseGetCurrencies } from '../pages/exchange/ExchangeRequests'
import { CURRENCY_OPTIONS, CurrencyOption } from '../constanst'

type State = {
  currencyFrom: CurrencyOption;
  currencyTo: CurrencyOption;
  amountFrom: string;
  amountTo: string;
  purposePay: string;
  email: string;
  currenciesAPI: ResponseGetCurrencies;
  courseFrom: string;
  courseTo: string;
  maxFrom: string;
  maxTo: string;
  minFrom: string;
  minTo: string;
  exhangerFee: string;
  mainersFee: string;
  isEmpty: Record<string, boolean>;
};

type Setters<T> = {
  [K in keyof T as `set${Capitalize<string & K>}`]: (value: T[K]) => void;
};

export const useGlobalStore = create<State & Setters<State>>((set) => {
  const initialState: State = {
    currencyFrom: CURRENCY_OPTIONS[0],
    currencyTo: CURRENCY_OPTIONS[1],
    amountFrom: '0',
    amountTo: '0',
    purposePay: '',
    email: '',
    currenciesAPI: {},
    courseFrom: '0',
    courseTo: '0',
    maxFrom: '0',
    maxTo: '0',
    minFrom: '0',
    minTo: '0',
    exhangerFee: '0',
    mainersFee: '0',
    isEmpty: {},
  };

  const setters = Object.fromEntries(
    Object.keys(initialState).map((key) => {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      const setterName = `set${capitalizedKey}`;
      return [
        setterName,
        (value: any) => set({ [key]: value }),
      ];
    })
  ) as Setters<State>;

  return {
    ...initialState,
    ...setters,
  };
});
