import { HTMLProps } from 'react'

import clsx from 'clsx'

type InputProps = HTMLProps<HTMLInputElement> & {
  className?: string
}

export const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      placeholder="Enter text"
      className={clsx(
        'rounded-md border border-gray-300 bg-transparent p-2 transition-colors focus:border-blue-500 focus:outline-none',
        className
      )}
      {...rest}
    />
  )
}
