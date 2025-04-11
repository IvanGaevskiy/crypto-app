import { HTMLProps } from 'react'

import clsx from 'clsx'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  text: string
  textColor?: string
  value?: string | number
}
export const MiniButton = ({
  type = 'button',
  className,
  text,
  textColor,
  value,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={clsx(
        'cursor-pointer bg-[#0f101b71]',
        'flex items-center justify-center rounded-md px-3 py-3 text-sm',
        className
      )}
      {...rest}
    >
      <span className={clsx('text-gray-400 hover:no-underline', textColor)}>{text}</span>
      <span className={clsx('hover:underline')}>{value}</span>
    </button>
  )
}
