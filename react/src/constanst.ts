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

export const MAX_SEND_ERROR = 'Ой, вы указали сумму больше 30 USDT. Пожалуйста, уменьшите её немного 😊'
export const MIN_SEND_ERROR = 'Сумма слишком маленькая для обмена — попробуйте указать немного больше 💰'
export const MAX_GET_ERROR = 'Похоже, сумма превышает доступный максимум (30 USDT минус комиссия). Попробуйте чуть меньше 💸'
export const MIN_GET_ERROR = 'Сумма слишком мала после вычета комиссии. Попробуйте указать чуть больше, чтобы всё сработало 🧮'
export const RECIPIENT_ADDRESS_ERROR = 'Упс! Адрес выглядит некорректно. Попробуйте формат P2PKH, P2SH или P2WPKH 📬'
export const EMAIL_ERROR = 'Проверьте, пожалуйста, email — кажется, там опечатка ✉️'
export const KYC_AML_ERROR = 'Чтобы мы могли продолжить, нужно ваше согласие с условиями — просто отметьте все чекбоксы ✅'

