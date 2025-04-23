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

export const EX_FEE = '0.03'
export const TX_FEE = '0.000006'
export const MIN = '11'
export const MAX = '30'

export const MAX_SEND_ERROR = `Максимум ${MAX} USDT. Уменьшите сумму`;
export const MIN_SEND_ERROR = `Значение менее ${MIN} USDT. Увеличьте немного`;
export const MAX_GET_ERROR = `Превышен максимум (${MAX} USDT минус комиссия)`;
export const MIN_GET_ERROR = `Маленькое значение (${MIN} USDT минус комиссия)`;
export const RECIPIENT_ADDRESS_ERROR = 'Некорректный адрес (P2PKH/P2SH/P2WPKH)';
export const EMAIL_ERROR = 'Проверьте email — есть опечатка ';
export const KYC_AML_ERROR = 'Отметьте чекбоксы для продолжения';
export const USTD_TO_BTC_ERROR = 'Доступен перевод только из USDT в BTC';
export const SERVER_HOST = 'http://localhost:3000'