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
import { ValidationInput } from '../../components/ValidationInput'
import { CURRENCY_OPTIONS, EX_FEE, MAX, MIN, TX_FEE } from '../../constanst'
import { numCut } from '../../utils/numCut'
import {
  isValidAmountFrom,
  isValidAmountTo,
  isValidEmail,
  isValidKYCAndAML,
  isValidPurposePay
} from '../../validations'
import { getCurrencies } from './ExchangeRequests'
import type { ResponseGetCurrencies } from './ExchangeRequests'

import { Decimal } from 'decimal.js'

export const ExchangePage = () => {
  const [currencyFrom, setCurrencyFrom] = useState(CURRENCY_OPTIONS[0])
  const [currencyTo, setCurrencyTo] = useState(CURRENCY_OPTIONS[1])
  const [amountFrom, setAmountFrom] = useState('0')
  const [amountTo, setAmountTo] = useState('0')
  const [purposePay, setPurposePay] = useState('')
  const [email, setEmail] = useState('')
  const [currenciesAPI, setCurrenciesAPI] = useState<ResponseGetCurrencies>({})
  const [courseFrom, setCourseFrom] = useState('0')
  const [courseTo, setCourseTo] = useState('0')
  const [maxFrom, setMaxFrom] = useState('0')
  const [maxTo, setMaxTo] = useState('0')
  const [minFrom, setMinFrom] = useState('0')
  const [minTo, setMinTo] = useState('0')
  const [exhangerFee, setExhangerFee] = useState('0')
  const [mainersFee, setMainersFee] = useState('0')
  const [isReversing, setIsReversing] = useState(false)
  const [isAmountConvertFrom, setIsAmountConvertFrom] = useState(false)
  const [isAmountConvertTo, setIsAmountConvertTo] = useState(false)
  const [isShowFee, setIsShowFee] = useState(true)
  const [isKYC, setIsKYC] = useState(true)
  const [isAML, setIsAML] = useState(true)
  const [isEmpty, setIsEmpty] = useState<Record<string, boolean>>({})

  const { curr: currFrom, currColor: currColorFrom, currBorder: currBorderFrom } = currencyFrom
  const { curr: currTo, currColor: currColorTo, currBorder: currBorderTo } = currencyTo

  const onInputChange = (
    setFunc: (value: string) => void,
    key: string,
    defaultZero: boolean = false
  ) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = defaultZero && e.target.value === '' ? '0' : e.target.value
      const isEmpty = value == '' || value == '0'

      setFunc(value)
      setIsEmpty((prev) => ({ ...prev, [key]: isEmpty }))
    }
  }

  const onCheckboxChange = (setFunc: (value: boolean) => void, key?: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFunc(e.target.checked)
      if (key) {
        const isEmpty = !e.target.checked
        setIsEmpty((prev) => ({ ...prev, [key]: isEmpty }))
      }
    }
  }

  const currencyReverse = () => {
    setIsReversing(true)
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
    setTimeout(() => {
      setIsReversing(false)
    }, 0)
  }

  const getPriceUSD = (curr: string, dataCurrAPI: ResponseGetCurrencies) => {
    if (dataCurrAPI?.[curr]) {
      return new Decimal(dataCurrAPI[curr].price_usd)
    }
    return new Decimal('0')
  }

  const setCourses = (dataCurrAPI: ResponseGetCurrencies) => {
    const from = getPriceUSD(currFrom, dataCurrAPI)
    const to = getPriceUSD(currTo, dataCurrAPI)

    const resultCourseFrom = numCut(new Decimal(from).div(to).abs())
    const resultCourseTo = numCut(new Decimal(to).div(from).abs())

    setCourseFrom(resultCourseFrom.toString())
    setCourseTo(resultCourseTo.toString())
  }

  const limitAfterFees = (priceBTC: Decimal, limit: string) => {
    const exchangeFee = new Decimal(limit).times(EX_FEE)
    const mainersFee = priceBTC.times(TX_FEE)
    const totalFees = exchangeFee.plus(mainersFee)
    return new Decimal(limit).minus(totalFees)
  }

  const setMaxMin = (dataCurrAPI: ResponseGetCurrencies) => {
    const from = getPriceUSD(currFrom, dataCurrAPI)
    const to = getPriceUSD(currTo, dataCurrAPI)

    const priceBTC = getPriceUSD('BTC', dataCurrAPI)

    const minAfterFees = limitAfterFees(priceBTC, MIN)
    const maxAfterFees = limitAfterFees(priceBTC, MAX)

    const min = new Decimal(MIN)
    const max = new Decimal(MAX)

    const resultMinFrom = numCut(min.div(from).abs())
    const resultMaxFrom = numCut(max.div(from).abs())

    const resultMinTo = numCut(minAfterFees.div(to).abs())
    const resultMaxTo = numCut(maxAfterFees.div(to).abs())

    setMinFrom(resultMinFrom.toString())
    setMaxFrom(resultMaxFrom.toString())

    setMinTo(resultMinTo.toString())
    setMaxTo(resultMaxTo.toString())
  }

  const fetchPrices = async () => {
    try {
      const data = await getCurrencies()
      setCurrenciesAPI(data)
      setCourses(data)
      setMaxMin(data)
    } catch (error) {
      console.log(error)
    }
  }

  const getExFee = (amount: string) => {
    const value = new Decimal(amount).times(EX_FEE)
    return value
  }

  const getTxFee = (amount: string, rate: string) => {
    const ifBTC = currTo === 'BTC' ? new Decimal(TX_FEE) : new Decimal(rate).times(TX_FEE)
    const isNotAmount = new Decimal(amount).lte('0')
    return isNotAmount ? new Decimal('0') : ifBTC
  }

  const setFees = (exFee: Decimal, txFee: Decimal) => {
    setExhangerFee(numCut(exFee).toString())
    setMainersFee(numCut(txFee).toString())
  }

  const amountCalc = (amount: string, rate: string) => {
    const value = new Decimal(amount).times(rate)
    const exhangerFee = value.times(EX_FEE)
    const mainersFee = getTxFee(amount, rate)

    setFees(exhangerFee, mainersFee)

    if (isShowFee && amount === amountFrom) {
      const totalFee = exhangerFee.plus(mainersFee)
      const finalValue = value.minus(totalFee)
      return String(numCut(finalValue))
    }

    return String(numCut(value))
  }

  const amountConvertFrom = () => {
    setIsAmountConvertFrom(true)

    const value = new Decimal(amountTo)
    const exhangerFee = getExFee(amountTo)
    const mainersFee = getTxFee(amountTo, courseFrom)

    setFees(exhangerFee, mainersFee)
    setAmountFrom(String(numCut(value.times(courseTo))))

    setTimeout(() => setIsAmountConvertFrom(false), 0)
  }

  const amountConvertTo = () => {
    setIsAmountConvertTo(true)
    setAmountTo(amountCalc(amountFrom, courseFrom))
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
    setCourses(currenciesAPI)
    setMaxMin(currenciesAPI)
  }, [currenciesAPI, currencyFrom, currencyTo])

  useEffect(() => {
    if (!isReversing) return
    setAmountTo(amountCalc(amountFrom, courseFrom))
  }, [courseTo, courseFrom])

  useEffect(() => {
    if (isReversing || isAmountConvertTo) return
    amountConvertFrom()
  }, [amountTo])

  useEffect(() => {
    if (isReversing || isAmountConvertFrom) return
    amountConvertTo()
  }, [amountFrom, isShowFee])

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <div className="flex flex-col">
          <div className="relative">
            <div className={clsx('flex flex-col space-y-1', currColorFrom)}>
              <div className="flex justify-between px-4 font-semibold">
                <label className="cursor-default">Отправляете</label>
                <div>{currFrom}</div>
              </div>
              <Input
                className={clsx(
                  'peer h-14 w-80 !bg-[#000000b0] pr-32 text-2xl',
                  currBorderFrom,
                  currColorFrom
                )}
                value={amountFrom}
                onChange={onInputChange(setAmountFrom, 'amountFrom', true)}
                maxLength={13}
                type="number"
              />
              <ValidationInput
                className={clsx('absolute top-30')}
                isEmpty={isEmpty.amountFrom}
                validFunc={isValidAmountFrom}
                args={[amountFrom, minFrom, maxFrom]}
              ></ValidationInput>
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
                className={clsx(
                  'peer h-14 w-80 !bg-[#000000b0] pr-32 text-2xl',
                  currBorderTo,
                  currColorTo
                )}
                value={amountTo}
                onChange={onInputChange(setAmountTo, 'amountTo', true)}
                maxLength={13}
                type="number"
              />
              <ValidationInput
                className={clsx('absolute top-30')}
                isEmpty={isEmpty.amountTo}
                validFunc={isValidAmountTo}
                args={[amountTo, minTo, maxTo]}
              ></ValidationInput>
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
      <div
        className={clsx(
          'mt-12 mb-2 flex justify-between border border-dashed border-gray-400',
          'gap-4 rounded-md !bg-[#1e235f] p-2 px-4'
        )}
      >
        <div className={clsx('flex flex-col items-baseline text-xs text-gray-400 select-none')}>
          <div>{`Комиссия обменника ${exhangerFee} ${currTo}`}</div>
          <div>{`Комиссия майнеров ${mainersFee} ${currTo}`}</div>
        </div>
        <Checkbox
          text="Показать с учётом комиссии"
          className="ml-auto accent-[#3e5ca7]"
          textClassName="text-gray-300 text-xs"
          checked={isShowFee}
          onChange={onCheckboxChange(setIsShowFee)}
        />
      </div>
      <div className="mb-2">
        <label className="block cursor-default pl-4 text-left text-gray-400">Назначение</label>
        <Input
          className={clsx('mb-0.5 h-14 w-full !bg-[#000000b0] text-white')}
          value={purposePay}
          onChange={onInputChange(setPurposePay, 'purposePay')}
          placeholder="Введите назначение перевода"
        />
        <ValidationInput
          isEmpty={isEmpty.purposePay}
          validFunc={isValidPurposePay}
          args={[purposePay]}
        ></ValidationInput>
      </div>
      <div className="mb-2">
        <label className="block cursor-default pl-4 text-left text-gray-400">Email</label>
        <Input
          className={clsx('mb-0.5 h-14 w-full !bg-[#000000b0] text-white')}
          value={email}
          onChange={onInputChange(setEmail, 'email')}
          placeholder="Введите email"
        />
        <ValidationInput
          isEmpty={isEmpty.email}
          validFunc={isValidEmail}
          args={[email]}
        ></ValidationInput>
      </div>
      <div className="flex justify-between">
        <div>
          <div className="flex flex-col items-start gap-1">
            <Checkbox
              text="Согласие с политикой конфиденциальности"
              className="accent-[#3e5ca7]"
              textClassName="text-gray-400 text-sm"
              checked={isKYC}
              onChange={onCheckboxChange(setIsKYC, 'isKYC')}
            />
            <Checkbox
              text="Согласие на обработку персональных данных"
              className="accent-[#3e5ca7]"
              textClassName="text-gray-300 text-sm"
              checked={isAML}
              onChange={onCheckboxChange(setIsAML, 'isAML')}
            />
          </div>
        </div>
        <Button>Начать обмен</Button>
      </div>
      <ValidationInput
        className='mt-2'
        isEmpty={!isEmpty.isAML && !isEmpty.isKYC}
        validFunc={isValidKYCAndAML}
        args={[[isKYC, isAML]]}
      ></ValidationInput>
    </div>
  )
}
