import clsx from 'clsx'

// components/CurrencyRateInfo.tsx
type Props = {
  currFrom: string
  currTo: string
  courseFrom: string
  currenciesAPI: Record<string, { price_usd: string }>
  className?: string
}

export const CurrencyRateInfo = ({
  currFrom,
  currTo,
  courseFrom,
  currenciesAPI,
  className
}: Props) => (
  <div
    className={clsx(
      'flex h-5 justify-between px-4 text-xs text-gray-400',
      'transition-all duration-300 ease-in-out',
      'translate-y-0 opacity-100',
      'peer-focus:pointer-events-none peer-focus:-translate-y-1 peer-focus:opacity-0',
      className
    )}
  >
    <div>{`1 ${currFrom} = ${courseFrom} ${currTo}`}</div>
    <div>{currenciesAPI[currFrom] ? `$ ${currenciesAPI[currFrom].price_usd}` : ''}</div>
  </div>
)
