import { useGlobalStore } from '../components/useGlobalStore'

export const onInputChange = (
  setFunc: (value: string) => void,
  key: string,
  defaultZero: boolean = false
) => {
  const { isEmpty, setIsEmpty } = useGlobalStore()
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = defaultZero && e.target.value === '' ? '0' : e.target.value
    const isEmp = value == '' || value == '0'

    setFunc(value)
    setIsEmpty({
      ...isEmpty,
      [key]: isEmp
    })
  }
}
