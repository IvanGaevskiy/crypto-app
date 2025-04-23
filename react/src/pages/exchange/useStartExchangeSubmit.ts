import { useGlobalStore } from '../../utils/useGlobalStore'
import {
  isValidAmountFrom,
  isValidAmountTo,
  isValidEmail,
  isValidKYCAndAML,
  isValidPurposePay,
  isValidUSDTToBTC
} from '../../validations'

export const useStartExchangeSubmit = () => {
  const globalStore = useGlobalStore()

  return (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const { amountFrom, amountTo } = globalStore
    const { minFrom, maxFrom, minTo, maxTo } = globalStore
    const { isKYC, isAML } = globalStore
    const { purposePay } = globalStore
    const { email } = globalStore
    const { setIsSubmit } = globalStore
    const { isEmpty, setIsEmpty } = globalStore
    const { currencyFrom, currencyTo } = globalStore

    const validations = {
      amountFrom: isValidAmountFrom(amountFrom, minFrom, maxFrom),
      amountTo: isValidAmountTo(amountTo, minTo, maxTo),
      purposePay: isValidPurposePay(purposePay),
      email: isValidEmail(email),
      kycAndAml: isValidKYCAndAML([isKYC, isAML]),
      usdtToBtc: isValidUSDTToBTC(currencyFrom.curr, currencyTo.curr)
    }

    const hasErrors = Object.values(validations).some((error) => typeof error === 'string')

    if (!hasErrors) {
      setIsSubmit(true)
    } else {
      const newEmptyState: Record<string, boolean> = {}
      for (const [key, isError] of Object.entries(validations)) {
        if (isError) newEmptyState[key] = false
      }

      setIsEmpty({ ...isEmpty, ...newEmptyState })
    }
  }
}
