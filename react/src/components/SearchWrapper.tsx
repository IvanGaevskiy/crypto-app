import { HTMLProps } from 'react'

import clsx from 'clsx'
import { ReactSVG } from 'react-svg'

import { getPath } from '../utils/getPath'

export const SearchWrapper = ({children}: HTMLProps<HTMLDivElement>) => {
  return (
    <div className={clsx('relative')}>
      <ReactSVG
        src={getPath('search.svg')}
        className={clsx('absolute top-2 left-3 mr-1 h-[10px] w-[10px]')}
      />
      {children}
    </div>
  )
}
