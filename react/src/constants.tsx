export type CurrencyOption = {
  curr: string
  currBlockchain: string
  currNetwork?: string
  currIssuer?: string
  currBgIssuer?: string
  currColorIssuer?: string
  currSvgNetworkPath?: string
  currSvgPath: string
  currColor: string
  currBorder: string
  currFocusBorder: string
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  {
    curr: 'BTC',
    currSvgPath: 'bitcoin.svg',
    currBlockchain: 'bitcoin',
    currColor: 'text-[#f7931a]',
    currBorder: 'border-[#f7931a]',
    currFocusBorder: 'focus:border-[#f7931a]'
  },
  {
    curr: 'USDT',
    currBlockchain: 'ERC20',
    currNetwork: 'ETH',
    currIssuer: 'Tether',
    currBgIssuer: 'bg-white',
    currColorIssuer: 'text-black',
    currSvgNetworkPath: 'networkEtherium.svg',
    currSvgPath: 'tether.svg',
    currColor: 'text-[#26a17b]',
    currBorder: 'border-[#26a17b]',
    currFocusBorder: 'focus:border-[#26a17b]'
  }
]
