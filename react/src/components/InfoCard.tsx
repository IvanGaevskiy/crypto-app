import { HTMLProps } from 'react'

import clsx from 'clsx'

import { Button } from './Button'

export const InfoCard = ({ children }: HTMLProps<HTMLDivElement>) => {
  return (
    <div>
      <div className={clsx('flex justify-between px-8 py-2')}>
        <h2 className={clsx('text-2xl font-bold text-gray-300')}>Транзакция</h2>
        <Button isPrimary={false}>
          Назад
        </Button>
      </div>
      <div
        className={clsx(
          'grid grid-cols-2 gap-4 rounded-md bg-[#000000b0]',
          'border border-gray-800 p-6 text-gray-300'
        )}
      >
        {children}
      </div>
    </div>
  )
}
