import { useState } from 'react'

import clsx from 'clsx'

import { CurrencyPopover } from '../../components/CurrencyPopover'
import { Input } from '../../components/Input'
import { CURRENCY_OPTIONS } from '../../constants'
import { ReactSVG } from 'react-svg'
import { getPath } from '../../utils/getPath'

export const ExchangePage = () => {
  const [selectedOption, setSelectedOption] = useState(CURRENCY_OPTIONS[0])
  const [selectedOption2, setSelectedOption2] = useState(CURRENCY_OPTIONS[1])
  const [inputValue, setInputValue] = useState<string>('')

  const { currency, twText, twBorder } = selectedOption
  const { currency: currency2, twText: twText2, twBorder: twBorder2 } = selectedOption2

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value === '' ? '0.0000' : value)
  }

  const currencyReverse = () => {
    setSelectedOption(selectedOption2)
    setSelectedOption2(selectedOption)
  }
  
  return (
    <div>
      {/* <h1>Exchange Page</h1>
      <p>This is the exchange page.</p> */}
      <div className="flex gap-4">
        <div className="relative">
          <label className={clsx('flex flex-col space-y-1', twText)}>
            <div className="flex justify-between px-4 font-semibold">
              <div>Отправляете</div>
              <div>{currency}</div>
            </div>
            <Input
              className={`h-14 w-80 !bg-[#000000b0] text-2xl ${twBorder} ${twText}`}
              value={inputValue}
              onChange={handleChange}
            />
            <CurrencyPopover
              selectedOptionCurrency={currency}
              setSelectedOption={setSelectedOption}
            />
          </label>
        </div>
        <div className='flex flex-col justify-center mt-3'>
          <button className={clsx("cursor-pointer")} onClick={currencyReverse}>
            <ReactSVG
              src={getPath('arrow_left.svg')}
              className={clsx("mr-1 h-[16px] w-[16px]", twText2)}
            />
            <ReactSVG
              src={getPath('arrow_right.svg')}
              className={clsx("mr-1 h-[16px] w-[16px]", twText)}
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
              value={inputValue}
              onChange={handleChange}
            />
            <CurrencyPopover
              selectedOptionCurrency={currency2}
              setSelectedOption={setSelectedOption2}
            />
          </label>
        </div>
      </div>
    </div>
  )
}
