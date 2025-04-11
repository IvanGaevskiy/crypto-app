import clsx from "clsx"

// components/CurrencyRateInfo.tsx
type Props = {
  currFrom: string
  currTo: string
  courseFrom: number
  currenciesAPI: Record<string, { price_usd: string }>
  className?: string
}

export const CurrencyRateInfo = ({ currFrom, currTo, courseFrom, currenciesAPI, className }: Props) => (
  <div className={clsx("flex h-5 justify-between px-4 text-sm text-gray-400", className)}>
    <div>{`1 ${currFrom} = ${courseFrom} ${currTo}`}</div>
    <div>
      {currenciesAPI[currFrom] ? `$ ${currenciesAPI[currFrom].price_usd}` : ''}
    </div>
  </div>
)
