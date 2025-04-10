import { Fragment, useState } from 'react'
import React from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

import { CURRENCY_OPTIONS, CurrencyOption } from '../constants'
import { getPath } from '../utils/getPath'
import { Input } from './Input'

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
    curr,
    currColor,
    currSvgPath
  } = CURRENCY_OPTIONS.find((option) => option.curr === selectedOptionCurrency) || {}

  const displayedOptions = CURRENCY_OPTIONS.filter((option) =>
    option.curr.toLowerCase().includes(inputValue.toLowerCase())
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
  }

  return (
    <Popover>
      <PopoverButton
        className={clsx(
          'absolute top-1/2 right-2 flex h-8 focus:outline-none',
          'cursor-pointer items-end justify-center',
          'rounded-lg px-3 py-2 text-2xl leading-5 hover:opacity-90',
          currColor
        )}
      >
        <div className="flex items-center justify-center">
          <ReactSVG src={getPath(currSvgPath)} className="mr-1 h-[24px] w-[24px]" />
          <div>{curr}</div>
        </div>
      </PopoverButton>
      <PopoverPanel
        className={clsx(
          'absolute top-6 flex w-full flex-col rounded-lg',
          'bg-[#21284b] shadow-lg',
          currColor
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
        <div className="mt-2 mr-auto px-4 text-xs text-gray-500">Популярные валюты</div>
        <div className="mt-2 flex flex-col">
          {displayedOptions.map((option) => (
            <Fragment key={option.curr}>
              <PopoverButton
                className={clsx(
                  'w-full cursor-pointer p-2 font-semibold last-of-type:rounded-b-lg hover:bg-[#29315c]',
                  option.currColor
                )}
                onClick={() => {
                  setSelectedOption(option)
                }}
              >
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center justify-center">
                    <ReactSVG src={getPath(option.currSvgPath)} className="mr-1 h-[24px] w-[24px]" />
                    <div>{`${option.currIssuer || ''}(${option.currBlockchain})`}</div>
                  </div>
                  <div className="flex flex-col">
                    <div>{option.curr}</div>
                    {option.currNetwork && (
                      <div
                        className={clsx(
                          `ml-auto inline-block h-4 rounded-md pr-1 text-xs`,
                          option.currBgIssuer,
                          option.currColorIssuer
                        )}
                      >
                        <div className="flex items-center justify-center">
                          <ReactSVG
                            src={getPath(option.currSvgNetworkPath)}
                            className="h-[14px] w-[14px]"
                          />
                          <div>{option.currNetwork}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </PopoverButton>
              <div className="mx-4 border-b-1 border-b-[#29315c] last-of-type:hidden" />
            </Fragment>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  )
}
