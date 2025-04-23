import { useGlobalStore } from '../../utils/useGlobalStore'

export const useCurrencyReverse = () => {
  const globalStore = useGlobalStore()

  const currencyReverse = () => {
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
  
  return { currencyReverse }
}
