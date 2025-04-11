import { HTMLProps } from 'react'

import clsx from 'clsx'

export const MinMaxContainer = ({ children, className }: HTMLProps<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        'flex h-5 justify-center gap-4 rounded-b-md border-0 shadow-none',
        'pointer-events-auto w-auto bg-transparent text-inherit',
        className
      )}
    >
      {children}
    </div>
  )
}
