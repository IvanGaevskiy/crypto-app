export type CurrencyOption = {
  currency: string
  blockchain: string
  network?: string
  issuer?: string
  twBgIssuer?: string
  twTextIssuer?: string
  svg: string
  twText: string
  twBorder: string
  twFocusBorder: string
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  {
    currency: 'BTC',
    svg: 'bitcoin.svg',
    blockchain: 'Bitcoin',
    twText: 'text-[#f7931a]',
    twBorder: 'border-[#f7931a]',
    twFocusBorder: 'focus:border-[#f7931a]'
  },
  {
    currency: 'USDT',
    blockchain: 'ERC20',
    network: 'ETH',
    issuer: 'Tether',
    twBgIssuer: 'bg-white',
    twTextIssuer: 'text-black',
    svg: 'tether.svg',
    twText: 'text-[#26a17b]',
    twBorder: 'border-[#26a17b]',
    twFocusBorder: 'focus:border-[#26a17b]'
  }
]
