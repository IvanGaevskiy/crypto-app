// import { HTMLProps } from 'react'
import { HTMLProps } from 'react'

import clsx from 'clsx'


type InputProps = HTMLProps<HTMLInputElement> & {
  className?: string
}

export const Input = ({ className, ...rest }: InputProps) => {
  return (
      <input
        className={clsx(
          'rounded-lg border bg-transparent p-2 px-4 transition-colors focus:outline-none',
          className
        )}
        {...rest}
      />
  )
}
