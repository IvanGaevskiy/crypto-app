import { useState } from 'react'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import { CURRENCY_OPTIONS, CurrencyOption } from '../constants'
import { Input } from './Input'

type CurrencyPopoverProps = {
  selectedOptionValue: string
  setSelectedOption: (value: CurrencyOption) => void
}

export const CurrencyPopover = ({
  selectedOptionValue,
  setSelectedOption
}: CurrencyPopoverProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const buttonText = CURRENCY_OPTIONS.find((option) => option.value === selectedOptionValue)?.title

  const displayedOptions = CURRENCY_OPTIONS.filter((option) =>
    option.title.toLowerCase().includes(inputValue.toLowerCase())
  )

  return (
    <Popover>
      <PopoverButton
        as="div"
        className="absolute top-1/2 right-[12px] flex h-8 w-[50px] -translate-y-1/2 cursor-pointer items-end justify-center rounded-lg !bg-[#826e17] px-3 py-2 text-[14px] leading-5"
      >
        {buttonText}
      </PopoverButton>
      <PopoverPanel className="absolute top-0 flex w-full flex-col gap-6 rounded-lg border border-gray-300 bg-white p-4 text-black shadow-lg">
        <Input
          value={inputValue}
          onChange={({ target }) => setInputValue((target as HTMLInputElement).value)}
        />

        <div className="flex flex-col gap-3">
          {displayedOptions.map((option) => (
            <PopoverButton
              key={option.value}
              className="bg-gray-[#aea6a6] rounded-lg p-2 text-white hover:bg-gray-300"
              onClick={() => {
                setSelectedOption(option)
              }}
            >
              {option.title}
            </PopoverButton>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
