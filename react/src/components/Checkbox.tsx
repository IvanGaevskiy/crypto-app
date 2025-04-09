import { HTMLProps } from 'react'

import clsx from 'clsx'

type InputProps = HTMLProps<HTMLInputElement> & {
  className?: string
  color?: string
  text?: string
  textColor?: string
}

export const Checkbox = ({ className, text, textColor, color, ...rest }: InputProps) => {
  return (
    <div>
      <label className={clsx('inline-flex items-center')} htmlFor="redCheckBox">
        <input
          type="checkbox"
          className={clsx('h-4.5 w-4.5 rounded-lg', color, className)}
          {...rest}
        />
        <span className={clsx('ml-2', textColor)}>{text}</span>
      </label>
    </div>
  )
}
