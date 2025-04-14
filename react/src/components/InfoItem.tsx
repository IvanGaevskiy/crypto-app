import { HTMLProps } from 'react'

import clsx from 'clsx'

type InfoItemProps = HTMLProps<HTMLDivElement> & {
  title: string
  description: string
  status?: string
}

export const InfoItem = ({ title, description, status }: InfoItemProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col items-baseline border border-gray-800',
        'rounded-md bg-gray-900 hover:bg-gray-800 px-4 py-2'
      )}
    >
      <div className={clsx('text-[16px] text-gray-500')}>{title}</div>
      <div className={clsx('text-sm text-gray-200')}>{description}</div>
      {status && <div className={clsx('text-xs font-bold text-green-800')}>{status}</div>}
    </div>
  )
}
