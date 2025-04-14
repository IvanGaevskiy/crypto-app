import { HTMLProps, ReactNode } from 'react'

import clsx from 'clsx'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  isPrimary?: boolean
  children?: ReactNode
}
export const Button = ({
  type = 'button',
  isPrimary = true,
  className,
  children,
  ...rest
}: ButtonProps) => {
  return (
    <div className="block select-none">
      <button
        className={clsx(
          'h-10 w-36 border-0 py-0.5 text-center',
          'cursor-pointer rounded focus:outline-none',
          isPrimary
            ? 'bg-[#0069a7] text-white hover:bg-[#005f96] active:bg-[#004f7c]'
            : [
                'bg-gray-800 text-gray-200 hover:bg-gray-900',
                'hover:text-white active:bg-gray-950'
              ],
          className
        )}
        {...rest}
      >
        {children}
      </button>
    </div>
  )
}
