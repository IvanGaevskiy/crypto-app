import { useState } from 'react'
import React from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import { CURRENCY_OPTIONS, CurrencyOption } from '../constants'
import { Input } from './Input'
import { getPath } from '../utils/getPath'

type CurrencyPopoverProps = {
  selectedOptionCurrency: string
  setSelectedOption: (value: CurrencyOption) => void
}

export const CurrencyPopover = ({
  selectedOptionCurrency,
  setSelectedOption
}: CurrencyPopoverProps) => {
  const [inputValue, setInputValue] = useState<string>('')

  const {
    twText,
    currency,
    svg: currencySvg
  } = CURRENCY_OPTIONS.find((option) => option.currency === selectedOptionCurrency) || {}
  const displayedOptions = CURRENCY_OPTIONS.filter((option) =>
    option.currency.toLowerCase().includes(inputValue.toLowerCase())
  )

  const isLastOption = (array: CurrencyOption[], option: CurrencyOption) => {
    const last = array[array.length - 1]
    return last === option
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  return (
    <Popover>
      <PopoverButton
        className={clsx(
          'absolute top-1/2 right-2 flex h-8 focus:outline-none',
          '-translate-y-1 cursor-pointer items-end justify-center',
          'rounded-lg px-3 py-2 text-2xl leading-5 hover:opacity-90',
          twText
        )}
      >
        <div className="flex items-center justify-center">
          <ReactSVG src={getPath(currencySvg)} className="mr-1 h-[24px] w-[24px]" />
          <div>{currency}</div>
        </div>
      </PopoverButton>
      <PopoverPanel
        className={clsx(
          'absolute top-6 flex w-full flex-col rounded-lg',
          'bg-[#21284b] shadow-lg',
          twText
        )}
      >
        <Input
          placeholder="Введите название или тикер"
          className="h-14 w-80 border-[#21284b]"
          value={inputValue}
          onChange={handleChange}
          isSearch
        />
        <div className="mx-4 border-b-1 border-b-[#495077]" />
        <div className='text-xs mr-auto px-4 text-gray-500 mt-2'>Популярные валюты</div>
        <div className="mt-2 flex flex-col">
          {displayedOptions.map((option) => (
            <div>
              <PopoverButton
                key={option.currency}
                className={clsx(
                  'w-full cursor-pointer bg-[#21284b] p-2 font-semibold hover:bg-[#29315c]',
                  option.twText,
                  isLastOption(displayedOptions, option) ? 'rounded-b-lg' : ''
                )}
                onClick={() => {
                  setSelectedOption(option)
                }}
              >
                <div className="flex justify-between px-4">
                  <div className="flex items-center justify-center">
                    <ReactSVG
                      src={getPath(option.svg)}
                      className="mr-1 h-[24px] w-[24px]"
                    />
                    <div>{`${option.issuer || ''}(${option.blockchain})`}</div>
                  </div>
                  <div className="flex flex-col">
                    <div>{option.currency}</div>
                    <div
                      className={clsx(
                        `ml-auto inline-block h-4 rounded-md pr-1 text-xs`,
                        option.twBgIssuer,
                        option.twTextIssuer
                      )}
                    >
                      <div className="flex items-center justify-center">
                        <ReactSVG
                          src={getPath(option.svgNetwork)}
                          className="h-[14px] w-[14px]"
                        />
                        <div>{option.network}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </PopoverButton>
              <div
                className={clsx(
                  'mx-4 border-b-1 border-b-[#29315c]',
                  isLastOption(displayedOptions, option) ? 'hidden' : ''
                )}
              />
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
