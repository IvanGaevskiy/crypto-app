import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useState } from "react";
import { Input } from "./Input";
import { CURRENCY_OPTIONS, CurrencyOption } from "../constants";

type CurrencyPopoverProps = {
  selectedOptionValue: string
  setSelectedOption: (value: CurrencyOption) => void
}

export const CurrencyPopover = ({ selectedOptionValue, setSelectedOption }: CurrencyPopoverProps) => {
  const [inputValue, setInputValue] = useState<string>('');

  const buttonText = CURRENCY_OPTIONS.find(option => option.value === selectedOptionValue)?.title;

  const displayedOptions = CURRENCY_OPTIONS.filter(option => option.title.toLowerCase().includes(inputValue.toLowerCase()));

  return (
    <Popover>
      <PopoverButton as='div' className='cursor-pointer absolute leading-5 w-[50px] py-2 px-3 h-8 text-[14px] flex items-end justify-center right-[12px] top-1/2 -translate-y-1/2 rounded-lg !bg-[#826e17]'>
        {buttonText}
      </PopoverButton>
      <PopoverPanel className='bg-white flex flex-col gap-6 text-black absolute top-0 w-full border border-gray-300 rounded-lg shadow-lg p-4'>
        <Input value={inputValue} onChange={({ target }) => setInputValue((target as HTMLInputElement).value)} />

        <div className='flex flex-col gap-3'>
          {displayedOptions.map((option) => (
            <PopoverButton
              key={option.value}
              className='bg-gray-[#aea6a6] text-white hover:bg-gray-300 rounded-lg p-2'
              onClick={() => {
                setSelectedOption(option);
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