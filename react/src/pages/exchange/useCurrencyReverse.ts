import { useGlobalStore } from '../../utils/useGlobalStore'

export const useCurrencyReverse = () => {
  const globalStore = useGlobalStore()
  return () => {
    const { setIsReversing } = globalStore
    const { currencyFrom, setCurrencyFrom } = globalStore
    const { currencyTo, setCurrencyTo } = globalStore

    setIsReversing(true)
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
    setTimeout(() => {
      setIsReversing(false)
    }, 0)
  }
}
