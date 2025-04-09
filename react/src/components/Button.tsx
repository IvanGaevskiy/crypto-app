import { HTMLProps, ReactNode } from 'react'

import clsx from 'clsx'

type ButtonProps = HTMLProps<HTMLButtonElement> & {
  isPrimary?: boolean
  children?: ReactNode
}
export const Button = ({ type = 'button', isPrimary = true, children, ...rest }: ButtonProps) => {
  return (
    <div className="block select-none">
      <button
        className={clsx(
          'h-10 w-36 border-0 py-0.5 text-center',
          'cursor-pointer rounded focus:outline-none',
          { 'bg-[#0069a7] text-white hover:bg-[#005f96]': isPrimary },
          {
            'active:bg-[#004f7c]': isPrimary
          },
          { 'text-cyan-600 hover:bg-cyan-600 hover:text-white active:bg-[#008fdf]': !isPrimary }
        )}
        {...rest}
      >
        {children}
      </button>
    </div>
  )
}
