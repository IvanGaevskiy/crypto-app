export type CurrencyOption = {
  title: string
  value: string
  name: string
  twText: string
  twBg: string
  twBorder: string
  twFocusBorder: string
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  {
    title: 'BTC',
    value: 'btc',
    name: 'Bitcoin',
    twText: 'text-[#f7931a]',
    twBg: 'bg-[#f7931a]',
    twBorder: 'border-[#f7931a]',
    twFocusBorder: 'focus:border-[#f7931a]'
  },
  {
    title: 'USDT',
    value: 'usdt',
    name: 'Tether (ERC20)',
    twText: 'text-[#26a17b]',
    twBg: 'bg-[#26a17b]',
    twBorder: 'border-[#26a17b]',
    twFocusBorder: 'focus:border-[#26a17b]'
  }
]
