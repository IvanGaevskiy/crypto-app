import { useEffect, useState } from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { CurrencyPopover } from '../../components/CurrencyPopover'
import { Input } from '../../components/Input'
import { CURRENCY_OPTIONS } from '../../constants'
import { getPath } from '../../utils/getPath'
import { numCut } from '../../utils/numCut'
import { getCurrencies } from './ExchangeRequests'
import type { ResponseGetCurrencies } from './ExchangeRequests'

export const ExchangePage = () => {
  const [currencyFrom, setCurrencyFrom] = useState(CURRENCY_OPTIONS[0])
  const [currencyTo, setCurrencyTo] = useState(CURRENCY_OPTIONS[1])
  const [amountFrom, setAmountFrom] = useState('')
  const [amountTo, setAmountTo] = useState('')
  const [purposePay, setPurposePay] = useState('')
  const [currenciesAPI, setCurrenciesAPI] = useState<ResponseGetCurrencies>({})
  const [courseFrom, setCourseFrom] = useState(0)
  const [courseTo, setCourseTo] = useState(0)
  const { curr: currFrom, currColor: currColorFrom, currBorder: currBorderFrom } = currencyFrom
  const { curr: currTo, currColor: currColorTo, currBorder: currBorderTo } = currencyTo

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

  const courseCalculation = (currenciesAPI: ResponseGetCurrencies) => {
    if (currenciesAPI?.[currFrom] && currenciesAPI?.[currTo]) {
      const from = Number(currenciesAPI[currFrom].price_usd)
      const to = Number(currenciesAPI[currTo].price_usd)

      const resultFrom = numCut(Math.abs(from / to))
      const resultTo = numCut(Math.abs(to / from))

      setCourseFrom(resultFrom)
      setCourseTo(resultTo)
    }
  }

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCurrencies()
        setCurrenciesAPI(data)
        courseCalculation(data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchPrices()

    const intervalID = setInterval(fetchPrices, 60000)

    return () => {
      clearInterval(intervalID)
    }
  }, [currencyFrom, currencyTo])

  return (
    <div>
      <div></div>
      {/* <h1>Exchange Page</h1>
      <p>This is the exchange page.</p> */}
      <div className="flex flex-col gap-5">
        <div className="flex gap-4">
          <div className="flex flex-col">
            <div className="relative">
              <label className={clsx('flex flex-col space-y-1', currColorFrom)}>
                <div className="flex justify-between px-4 font-semibold">
                  <div>Отправляете</div>
                  <div>{currFrom}</div>
                </div>
                <Input
                  className={`h-14 w-80 !bg-[#000000b0] text-2xl ${currBorderFrom} ${currColorFrom}`}
                  value={amountFrom}
                  onChange={handleChange(setAmountFrom)}
                />
                <CurrencyPopover
                  selectedOptionCurrency={currFrom}
                  setSelectedOption={setCurrencyFrom}
                />
              </label>
            </div>
            <div className={clsx('flex justify-between px-4 text-sm text-gray-400')}>
              <div>{`1 ${currFrom} = ${courseFrom} ${currTo}`}</div>
              <div className={clsx(' ')}>
                {currenciesAPI[currFrom] ? `$ ${currenciesAPI[currFrom].price_usd}` : ''}
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <button className={clsx('cursor-pointer')} onClick={currencyReverse}>
              <ReactSVG
                src={getPath('arrow_left.svg')}
                className={clsx('mr-1 h-[16px] w-[16px]', currColorTo)}
              />
              <ReactSVG
                src={getPath('arrow_right.svg')}
                className={clsx('mr-1 h-[16px] w-[16px]', currColorFrom)}
              />
            </button>
          </div>
          <div className="flex flex-col">
            <div className="relative">
              <label className={clsx('flex flex-col space-y-1', currColorTo)}>
                <div className="flex justify-between px-4 font-semibold">
                  <div>Получаете</div>
                  <div>{currTo}</div>
                </div>
                <Input
                  className={`h-14 w-80 !bg-[#000000b0] text-2xl ${currBorderTo} ${currColorTo}`}
                  value={amountTo}
                  onChange={handleChange(setAmountTo)}
                />
                <CurrencyPopover
                  selectedOptionCurrency={currTo}
                  setSelectedOption={setCurrencyTo}
                />
              </label>
            </div>
            <div className={clsx('flex justify-between px-4 text-sm text-gray-400')}>
              <div>{`1 ${currTo} = ${courseTo} ${currFrom}`}</div>
              <div className={clsx(' ')}>
                {currenciesAPI[currTo] ? `$ ${currenciesAPI[currTo].price_usd}` : ''}
              </div>
            </div>
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
