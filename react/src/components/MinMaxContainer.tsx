import { HTMLProps } from 'react'

import clsx from 'clsx'

export const MinMaxContainer = ({ children, className }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        'flex h-5 justify-center gap-4 rounded-b-md border-0 shadow-none',
        'pointer-events-auto w-auto bg-transparent text-inherit',
        'transition-all duration-300 ease-in-out',
        'pointer-events-none -translate-y-1 opacity-0',
        'peer-focus:pointer-events-auto peer-focus:-translate-y-6 peer-focus:opacity-100',
        className
      )}
    >
      {children}
    </div>
  )
}
