import { useState } from 'react'

import { CurrencyPopover } from '../../components/CurrencyPopover'
import { Input } from '../../components/Input'
import { CURRENCY_OPTIONS } from '../../constants'

export const ExchangePage = () => {
  const [selectedOption, setSelectedOption] = useState(CURRENCY_OPTIONS[0])

  return (
    <div>
      <h1>Exchange Page</h1>
      <p>This is the exchange page.</p>
      <div className="relative h-12 w-full">
        <Input className="h-full w-full" />
        <CurrencyPopover
          selectedOptionValue={selectedOption.value}
          setSelectedOption={setSelectedOption}
        />
      </div>
    </div>
  )
}
