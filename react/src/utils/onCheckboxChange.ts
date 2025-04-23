import { useGlobalStore } from './useGlobalStore'

export const onCheckboxChange = (setFunc: (value: boolean) => void, key?: string) => {
  const { isEmpty, setIsEmpty } = useGlobalStore()

  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunc(e.target.checked)
    if (key) {
      const isEmp = !e.target.checked
      setIsEmpty({
        ...isEmpty,
        [key]: isEmp
      })
    }
  }
}
