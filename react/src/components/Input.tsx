// import { HTMLProps } from 'react'
import { HTMLProps } from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { getPath } from '../utils/getPath'

type InputProps = HTMLProps<HTMLInputElement> & {
  className?: string
  isSearch?: boolean
}

export const Input = ({ className, isSearch, ...rest }: InputProps) => {
  return (
    <div className={clsx({ relative: isSearch })}>
      {isSearch && (
        <ReactSVG
          src={getPath('search.svg')}
          className={clsx('absolute top-4 left-3 mr-1 h-[24px] w-[24px]')}
        />
      )}
      <input
        className={clsx(
          'rounded-lg border bg-transparent p-2 px-4 transition-colors focus:outline-none',
          { 'pl-10': isSearch },
          className
        )}
        {...rest}
      />
    </div>
  )
}
