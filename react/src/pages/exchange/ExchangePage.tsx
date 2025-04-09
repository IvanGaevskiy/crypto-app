import { useState } from 'react'

import { CurrencyPopover } from '../../components/CurrencyPopover'
import { Input } from '../../components/Input'
import { CURRENCY_OPTIONS } from '../../constants'
import clsx from 'clsx'

export const ExchangePage = () => {
  const [selectedOption, setSelectedOption] = useState(CURRENCY_OPTIONS[0])
  // const [selectedOption2, setSelectedOption2] = useState(CURRENCY_OPTIONS[1])
  const [inputValue, setInputValue] = useState<string>('')

  const { currency, twText, twBorder } = selectedOption
  // const { name: name2, twText: twText2, twBorder: twBorder2 } = selectedOption2
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value === '' ? '0.0000' : value)
  }
  
  return (
    <div>
      {/* <h1>Exchange Page</h1>
      <p>This is the exchange page.</p> */}
      <div className="relative">
        <label className={clsx("flex flex-col space-y-1", twText)}>
          <div className="flex justify-between px-4">
            <div>Отправляете</div>
            <div>{currency}</div>
          </div>
          <Input
            className={`h-14 w-80 !bg-[#000000b0] text-2xl ${twBorder} ${twText}`}
            value={inputValue}
            onChange={handleChange}
          />
          <CurrencyPopover
            selectedOptionCurrency={selectedOption.currency}
            setSelectedOption={setSelectedOption}
          />
        </label>
      </div>
    </div>
  )
}
