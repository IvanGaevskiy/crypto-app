import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { CurrencyPopover } from '../../components/CurrencyPopover'
import { CurrencyRateInfo } from '../../components/CurrencyRateInfo'
import { Input } from '../../components/Input'
import { MinMaxContainer } from '../../components/MinMaxContainer'
import { MiniButton } from '../../components/MiniButton'
import { ReverseButton } from '../../components/ReverseButton'
import { CURRENCY_OPTIONS } from '../../constants'
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
  const [maxFrom, setMaxFrom] = useState(0)
  const [maxTo, setMaxTo] = useState(0)
  const [minFrom, setMinFrom] = useState(0)
  const [minTo, setMinTo] = useState(0)
  const [isReversing, setIsReversing] = useState(false)
  const [isAmountConvertFrom, setIsAmountConvertFrom] = useState(false)
  const [isAmountConvertTo, setIsAmountConvertTo] = useState(false)

  const { curr: currFrom, currColor: currColorFrom, currBorder: currBorderFrom } = currencyFrom
  const { curr: currTo, currColor: currColorTo, currBorder: currBorderTo } = currencyTo

  const handleChange = (setFunc: (value: string) => void) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setFunc(value)
    }
  }

  const currencyReverse = () => {
    setIsReversing(true)
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
    setAmountFrom(amountTo)
    setAmountTo(amountFrom)

    setTimeout(() => {
      setIsReversing(false)
    }, 0)
  }

  const courseCalc = (currenciesAPI: ResponseGetCurrencies) => {
    if (currenciesAPI?.[currFrom] && currenciesAPI?.[currTo]) {
      const from = Number(currenciesAPI[currFrom].price_usd)
      const to = Number(currenciesAPI[currTo].price_usd)

      const resultCourseFrom = numCut(Math.abs(from / to))
      const resultCourseTo = numCut(Math.abs(to / from))

      setCourseFrom(resultCourseFrom)
      setCourseTo(resultCourseTo)

      const priceUSDT = Number(currenciesAPI['USDT'].price_usd)
      const min = priceUSDT * 11
      const max = priceUSDT * 30

      const resultMaxFrom = numCut(Math.abs(max / from))
      const resultMaxTo = numCut(Math.abs(max / to))
      const resultMinFrom = numCut(Math.abs(min / from))
      const resultMinTo = numCut(Math.abs(min / to))

      setMaxFrom(resultMaxFrom)
      setMaxTo(resultMaxTo)

      setMinFrom(resultMinFrom)
      setMinTo(resultMinTo)
    }
  }

  const fetchPrices = async () => {
    try {
      const data = await getCurrencies()
      setCurrenciesAPI(data)
      courseCalc(data)
    } catch (error) {
      console.log(error)
    }
  }

  const valCalc = (amount: string, rate: number) => {
    return String(numCut(Number(amount) * rate))
  }

  const amountConvertFrom = () => {
    setIsAmountConvertFrom(true)
    setAmountFrom(valCalc(amountTo, courseTo))
    setTimeout(() => setIsAmountConvertFrom(false), 0)
  }

  const amountConvertTo = () => {
    setIsAmountConvertTo(true)
    setAmountTo(valCalc(amountFrom, courseFrom))
    setTimeout(() => setIsAmountConvertTo(false), 0)
  }

  useEffect(() => {
    fetchPrices()
    const intervalID = setInterval(fetchPrices, 60000)
    return () => {
      clearInterval(intervalID)
    }
  }, [])

  useEffect(() => {
    courseCalc(currenciesAPI)
  }, [currencyFrom, currencyTo, currencyFrom, currencyTo])

  useEffect(() => {
    if (isReversing || isAmountConvertTo) return
    console.log('usto')
    amountConvertFrom()
  }, [amountTo])

  useEffect(() => {
    if (isReversing || isAmountConvertFrom) return
    amountConvertTo()
    console.log('usfrom')
  }, [amountFrom])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <div className="relative">
            <div className={clsx('flex flex-col space-y-1', currColorFrom)}>
              <div className="flex justify-between px-4 font-semibold">
                <label className="cursor-default">Отправляете</label>
                <div>{currFrom}</div>
              </div>
              <Input
                className={`peer h-14 w-80 !bg-[#000000b0] text-2xl ${currBorderFrom} ${currColorFrom}`}
                value={amountFrom}
                onChange={handleChange(setAmountFrom)}
                maxLength={13}
              />

              <CurrencyRateInfo
                currFrom={currFrom}
                currTo={currTo}
                courseFrom={courseFrom}
                currenciesAPI={currenciesAPI}
              />

              <MinMaxContainer>
                <MiniButton
                  className={currColorFrom}
                  text="min: "
                  value={minFrom}
                  onMouseDown={() => setAmountFrom(String(minFrom))}
                />
                <MiniButton
                  className={currColorFrom}
                  text="max: "
                  value={maxFrom}
                  onMouseDown={() => setAmountFrom(String(maxFrom))}
                />
              </MinMaxContainer>

              <CurrencyPopover
                selectedOptionCurrency={currFrom}
                setSelectedOption={setCurrencyFrom}
              />
            </div>
          </div>
        </div>
        <div className="mb-8 flex flex-col justify-center">
          <ReverseButton
            colorLeft={currColorTo}
            colorRight={currColorFrom}
            onClick={currencyReverse}
          />
        </div>
        <div className="flex flex-col">
          <div className="relative">
            <div className={clsx('flex flex-col space-y-1', currColorTo)}>
              <div className="flex justify-between px-4 font-semibold">
                <label className="cursor-default">Получаете</label>
                <div>{currTo}</div>
              </div>
              <Input
                className={`peer h-14 w-80 !bg-[#000000b0] text-2xl ${currBorderTo} ${currColorTo}`}
                value={amountTo}
                readOnly
                maxLength={13}
              />
              <CurrencyRateInfo
                currFrom={currTo}
                currTo={currFrom}
                courseFrom={courseTo}
                currenciesAPI={currenciesAPI}
              />

              <MinMaxContainer>
                <MiniButton
                  className={currColorTo}
                  text="min: "
                  value={minTo}
                  onMouseDown={() => setAmountTo(String(minTo))}
                />
                <MiniButton
                  className={currColorTo}
                  text="max: "
                  value={maxTo}
                  onMouseDown={() => setAmountTo(String(maxTo))}
                />
              </MinMaxContainer>

              <CurrencyPopover selectedOptionCurrency={currTo} setSelectedOption={setCurrencyTo} />
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
            text="Согласие с политикой конфиденциальности"
            className="accent-[#3e5ca7]"
            textClassName="text-gray-400 text-sm"
          />
          <Checkbox
            text="Согласие на обработку персональных данных"
            className="accent-[#3e5ca7]"
            textClassName="text-gray-300 text-sm"
          />
        </div>
        <Button>Начать обмен</Button>
      </div>
    </div>
  )
}
