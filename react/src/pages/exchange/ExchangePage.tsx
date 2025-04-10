import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { CurrencyPopover } from '../../components/CurrencyPopover'
import { Input } from '../../components/Input'
import { CURRENCY_OPTIONS } from '../../constants'
import { getPath } from '../../utils/getPath'
import { GET_СURRENCIES } from './ExchangeRequests'
import type { ResponseGetCurrencies } from './ExchangeRequests'

export const ExchangePage = () => {
  const [currencyFrom, setCurrencyFrom] = useState(CURRENCY_OPTIONS[0])
  const [currencyTo, setCurrencyTo] = useState(CURRENCY_OPTIONS[1])
  const [amountFrom, setAmountFrom] = useState<string>('')
  const [amountTo, setAmountTo] = useState<string>('')
  const [purposePay, setPurposePay] = useState<string>('')
  const [pricesUSD, setPricesUSD] = useState<ResponseGetCurrencies>({})
  const { currency, twText, twBorder } = currencyFrom
  const { currency: currency2, twText: twText2, twBorder: twBorder2 } = currencyTo

  const handleChange = (setFunc: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFunc(value)
    }
  }

  const currencyReverse = () => {
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
  }
  
  useEffect(() => {
    const fetchPrices = () => GET_СURRENCIES().then(setPricesUSD);
    fetchPrices()
    const intervalID = setInterval(fetchPrices, 60000);
    return () => clearInterval(intervalID);
  }, []);
  console.log(pricesUSD)
  
  return (
    <div>
      {/* <h1>Exchange Page</h1>
      <p>This is the exchange page.</p> */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="relative">
            <label className={clsx('flex flex-col space-y-1', twText)}>
              <div className="flex justify-between px-4 font-semibold">
                <div>Отправляете</div>
                <div>{currency}</div>
              </div>
              <Input
                className={`h-14 w-80 !bg-[#000000b0] text-2xl ${twBorder} ${twText}`}
                value={amountFrom}
                onChange={handleChange(setAmountFrom)}
              />
              <CurrencyPopover
                selectedOptionCurrency={currency}
                setSelectedOption={setCurrencyFrom}
              />
            </label>
          </div>
          <div className="mt-3 flex flex-col justify-center">
            <button className={clsx('cursor-pointer')} onClick={currencyReverse}>
              <ReactSVG
                src={getPath('arrow_left.svg')}
                className={clsx('mr-1 h-[16px] w-[16px]', twText2)}
              />
              <ReactSVG
                src={getPath('arrow_right.svg')}
                className={clsx('mr-1 h-[16px] w-[16px]', twText)}
              />
            </button>
          </div>
          <div className="relative">
            <label className={clsx('flex flex-col space-y-1', twText2)}>
              <div className="flex justify-between px-4 font-semibold">
                <div>Получаете</div>
                <div>{currency2}</div>
              </div>
              <Input
                className={`h-14 w-80 !bg-[#000000b0] text-2xl ${twBorder2} ${twText2}`}
                value={amountTo}
                onChange={handleChange(setAmountTo)}
              />
              <CurrencyPopover
                selectedOptionCurrency={currency2}
                setSelectedOption={setCurrencyTo}
              />
            </label>
          </div>
        </div>
        <Input
          className={clsx('h-14 w-full !bg-[#000000b0] text-white')}
          value={purposePay}
          onChange={handleChange(setPurposePay)}
          placeholder="Введите назначение перевода"
        />
        <div className="flex justify-between">
          <div className="flex flex-col items-start">
            <Checkbox
              text="Согласен с политикой конфиденциальности"
              textColor="text-gray-400"
              color="accent-[#3e5ca7]"
            />
            <Checkbox
              text="Согласен на обработку моих персональных данных"
              textColor="text-gray-300"
              color="accent-[#3e5ca7]"
            />
          </div>
          <Button>Начать обмен</Button>
        </div>
      </div>
    </div>
  )
}
