import { HTMLProps } from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { getPath } from '../utils/getPath'

type InputProps = HTMLProps<HTMLDivElement> & {
  className?: string
}

export const Loader = ({ className, ...rest }: InputProps) => {
  return (
    // <div
    //   className={clsx('h-3 w-3 animate-spin border-2 border-[#000000b0] bg-', className)}
    //   {...rest}
    // ></div>
    <ReactSVG src={getPath('tether.svg')} className={clsx('mr-1 h-[16px] w-[16px] animate-spin')} />
  )
}
