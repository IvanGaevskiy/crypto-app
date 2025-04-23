import { useEffect, useState } from 'react'

import clsx from 'clsx'

import { Button } from '../../components/Button'
import { Checkbox } from '../../components/Checkbox'
import { CurrencyPopover } from '../../components/CurrencyPopover'
import { CurrencyRateInfo } from '../../components/CurrencyRateInfo'
import { Input } from '../../components/Input'
import { Loader } from '../../components/Loader'
import { MinMaxContainer } from '../../components/MinMaxContainer'
import { MiniButton } from '../../components/MiniButton'
import { ReverseButton } from '../../components/ReverseButton'
import { ValidationInput } from '../../components/ValidationInput'
import { EX_FEE, MAX, MIN, TX_FEE } from '../../constanst'
import { numCut } from '../../utils/numCut'
import { onCheckboxChange } from '../../utils/onCheckboxChange'
import { onInputChange } from '../../utils/onInputChange'
import { onInputInsert } from '../../utils/onInputInsert'
import { useGlobalStore } from '../../utils/useGlobalStore'
import {
  isValidAmountFrom,
  isValidAmountTo,
  isValidEmail,
  isValidKYCAndAML,
  isValidPurposePay,
  isValidUSDTToBTC
} from '../../validations'
import { getCurrencies } from './ExchangeRequests'
import type { ResponseGetCurrencies } from './ExchangeRequests'
import { useCurrencyReverse } from './useCurrencyReverse'
import { useSendTransaction } from './useSendTransaction'
import { useStartExchangeSubmit } from './useStartExchangeSubmit'

import { Decimal } from 'decimal.js'

export const ExchangePage = () => {
  const { currencyFrom, setCurrencyFrom } = useGlobalStore()
  const { currencyTo, setCurrencyTo } = useGlobalStore()

  const { amountFrom, setAmountFrom } = useGlobalStore()
  const { amountTo, setAmountTo } = useGlobalStore()

  const { purposePay, setPurposePay } = useGlobalStore()
  const { email, setEmail } = useGlobalStore()

  const { currenciesAPI, setCurrenciesAPI } = useGlobalStore()
  const { courseFrom, setCourseFrom } = useGlobalStore()
  const { courseTo, setCourseTo } = useGlobalStore()

  const { maxFrom, setMaxFrom } = useGlobalStore()
  const { maxTo, setMaxTo } = useGlobalStore()

  const { minFrom, setMinFrom } = useGlobalStore()
  const { minTo, setMinTo } = useGlobalStore()

  const { exhangerFee, setExhangerFee } = useGlobalStore()
  const { mainersFee, setMainersFee } = useGlobalStore()
  const { isEmpty } = useGlobalStore()

  const { isKYC, setIsKYC } = useGlobalStore()
  const { isAML, setIsAML } = useGlobalStore()

  const { isSubmit } = useGlobalStore()

  const { isReversing } = useGlobalStore()

  const [isAmountConvertFrom, setIsAmountConvertFrom] = useState(false)
  const [isAmountConvertTo, setIsAmountConvertTo] = useState(false)
  const [isShowFee, setIsShowFee] = useState(true)

  const { curr: currFrom, currColor: currColorFrom, currBorder: currBorderFrom } = currencyFrom
  const { curr: currTo, currColor: currColorTo, currBorder: currBorderTo } = currencyTo

  const startExchangeSubmit = useStartExchangeSubmit()
  const sendTransaction = useSendTransaction()
  const currencyReverse = useCurrencyReverse()

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

  const limitAfterFees = (priceBTC: Decimal, limit: Decimal) => {
    if (isShowFee) {
      const exchangeFee = limit.times(EX_FEE)
      const mainersFee = priceBTC.times(TX_FEE)
      const totalFees = exchangeFee.plus(mainersFee)
  
      return limit.plus(totalFees)
    }

    return limit
  }

  const setMaxMin = (dataCurrAPI: ResponseGetCurrencies) => {
    const from = getPriceUSD(currFrom, dataCurrAPI)
    const to = getPriceUSD(currTo, dataCurrAPI)

    const priceUSDT = getPriceUSD('USDT', dataCurrAPI)

    const priceUSDTMin = new Decimal(MIN).times(priceUSDT)
    const priceUSDTMax = new Decimal(MAX).times(priceUSDT)

    if (currFrom === 'USDT') {
      setMinFrom(MIN)
      setMaxFrom(MAX)

    }else {
      const resultMinFrom = numCut(priceUSDTMin.div(from).abs())
      const resultMaxFrom = numCut(priceUSDTMax.div(from).abs())
  
      setMinFrom(resultMinFrom.toString())
      setMaxFrom(resultMaxFrom.toString())
    }

    const priceBTC = getPriceUSD('BTC', dataCurrAPI)

    const minAfterFees = limitAfterFees(priceBTC, priceUSDTMin)
    const maxAfterFees = limitAfterFees(priceBTC, priceUSDTMax)

    const resultMinTo = numCut(minAfterFees.div(to).abs())
    const resultMaxTo = numCut(maxAfterFees.div(to).abs())

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
    if (isShowFee) {
      const allFees = exhangerFee.plus(mainersFee)
      const valuePlusFees = value.plus(allFees)
      console.log('valuePlusFees.times(courseTo)', valuePlusFees.times(courseTo).toString())
      setAmountFrom(String(numCut(valuePlusFees.times(courseTo))))
    } else {
      setAmountFrom(String(numCut(value.times(courseTo))))
    }

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

  useEffect(() => {
    if (!isSubmit) return
    sendTransaction()
  }, [isSubmit])

  return (
    <div className="flex flex-col max-sm:p-4">
      <div className="flex gap-4 max-sm:flex-col max-sm:items-baseline max-sm:gap-0">
        <div className="flex flex-col max-sm:w-full">
          <div className="relative">
            <div className={clsx('flex flex-col space-y-1', currColorFrom)}>
              <div className="flex justify-between px-4 text-sm">
                <label className="cursor-default">Отправляете</label>
                <div>{currFrom}</div>
              </div>
              <Input
                className={clsx(
                  'peer h-10 w-70 !bg-[#000000b0] pr-32 text-sm max-sm:w-full',
                  currBorderFrom,
                  currColorFrom
                )}
                value={amountFrom}
                onChange={onInputChange(setAmountFrom, 'amountFrom', true)}
                maxLength={13}
                type="number"
              />
              <ValidationInput
                className={clsx('absolute top-24 w-full')}
                isEmpty={isEmpty.amountFrom}
                validFunc={isValidAmountFrom}
                args={[amountFrom, minFrom, maxFrom]}
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
                  onMouseDown={onInputInsert(() => setAmountFrom(minFrom), 'usdtToBtc')}
                />
                <MiniButton
                  className={currColorFrom}
                  text="max: "
                  value={maxFrom}
                  onMouseDown={onInputInsert(() => setAmountFrom(maxFrom), 'usdtToBtc')}
                />
              </MinMaxContainer>

              <CurrencyPopover
                selectedOptionCurrency={currFrom}
                setSelectedOption={setCurrencyFrom}
              />
            </div>
          </div>
        </div>
        <div className="z-20 mb-8 flex flex-col justify-center max-sm:-mt-8 max-sm:mr-8 max-sm:mb-0 max-sm:self-end">
          <ReverseButton
            colorLeft={currColorTo}
            colorRight={currColorFrom}
            onClick={currencyReverse}
          />
        </div>
        <div className="flex flex-col max-sm:w-full">
          <div className="relative max-sm:w-full">
            <div className={clsx('flex flex-col space-y-1', currColorTo)}>
              <div className="flex justify-between px-4 text-sm">
                <label className="cursor-default">Получаете</label>
                <div>{currTo}</div>
              </div>
              <Input
                className={clsx(
                  'peer h-10 w-70 !bg-[#000000b0] pr-32 text-sm max-sm:w-full',
                  currBorderTo,
                  currColorTo
                )}
                value={amountTo}
                onChange={onInputChange(setAmountTo, 'amountTo', true)}
                maxLength={13}
                type="number"
              />
              <ValidationInput
                className={clsx('absolute top-24 w-full')}
                isEmpty={isEmpty.amountTo}
                validFunc={isValidAmountTo}
                args={[amountTo, minTo, maxTo]}
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
      <div className="mb-2">
        <label className="block cursor-default pl-4 text-left text-xs text-gray-400">
          Назначение
        </label>
        <Input
          className={clsx('mb-0.5 h-10 w-full border-0 !bg-[#000000b0] text-sm text-white')}
          value={purposePay}
          onChange={onInputChange(setPurposePay, 'purposePay')}
          placeholder="Введите назначение перевода"
        />
        <ValidationInput
          isEmpty={isEmpty.purposePay}
          validFunc={isValidPurposePay}
          args={[purposePay]}
        />
      </div>
      <div className="mb-2">
        <label className="block cursor-default pl-4 text-left text-xs text-gray-400">Email</label>
        <Input
          className={clsx('mb-0.5 h-10 w-full border-0 !bg-[#000000b0] text-sm text-white')}
          value={email}
          onChange={onInputChange(setEmail, 'email')}
          placeholder="Введите email"
        />
        <ValidationInput isEmpty={isEmpty.email} validFunc={isValidEmail} args={[email]} />
      </div>
      <div className="mt-1 mb-1 border-b-1 border-b-[#ffffff81]" />
      <div className={clsx('flex justify-between', 'gap-4 rounded-md')}>
        <div
          className={clsx(
            'flex flex-col items-baseline text-xs whitespace-nowrap text-gray-400 select-none'
          )}
        >
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
      <div className="mt-1 mb-1 border-b-1 border-b-[#ffffff81]" />
      <div className="flex justify-between max-sm:flex-col max-sm:gap-2">
        <div>
          <div className="flex flex-col items-start gap-1">
            <Checkbox
              text="Согласие с политикой конфиденциальности"
              className="!w-3 accent-[#3e5ca7]"
              textClassName="text-gray-400 text-xs"
              checked={isKYC}
              onChange={onCheckboxChange(setIsKYC, 'isKYC')}
            />
            <Checkbox
              text="Согласие на обработку персональных данных"
              className="!w-3 accent-[#3e5ca7]"
              textClassName="text-gray-400 text-xs"
              checked={isAML}
              onChange={onCheckboxChange(setIsAML, 'isAML')}
            />
          </div>
        </div>
        <Button onClick={startExchangeSubmit} type="submit" className="!h-9 text-sm">
          {isSubmit && (
            <div className="flex items-center justify-center gap-0.5">
              <Loader></Loader>
              <span>Загрузка</span>
            </div>
          )}
          {!isSubmit && <span>Начать обмен</span>}
        </Button>
      </div>
      <ValidationInput
        className="mt-2 mb-1"
        isEmpty={!isEmpty.isAML && !isEmpty.isKYC}
        validFunc={isValidKYCAndAML}
        args={[[isKYC, isAML]]}
      />
      <ValidationInput
        isEmpty={isEmpty.usdtToBtc}
        validFunc={isValidUSDTToBTC}
        args={[currFrom, currTo]}
      />
    </div>
  )
}
