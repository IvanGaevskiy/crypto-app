import { HTMLProps } from 'react'

import clsx from 'clsx'

type InputProps = HTMLProps<HTMLInputElement> & {
  className?: string
  text?: string
  textClassName?: string
}

export const Checkbox = ({ className, text, textClassName, color, ...rest }: InputProps) => {
  return (
    <div>
      <label className={clsx('inline-flex items-center')} htmlFor="redCheckBox">
        <input
          type="checkbox"
          className={clsx('h-4.5 w-4.5 rounded-lg', className)}
          {...rest}
        />
        <span className={clsx('ml-2', textClassName)}>{text}</span>
      </label>
    </div>
  )
}
