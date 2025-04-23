import { useGlobalStore } from './useGlobalStore'

export const onInputInsert = (setFunc: () => void, key: string) => {
  const { isEmpty, setIsEmpty } = useGlobalStore()
  return () => {
    const isEmp = false

    setFunc()
    setIsEmpty({
      ...isEmpty,
      [key]: isEmp
    })
  }
}
