export const onInputChange = (setFunc: (value: string) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? '0' : e.target.value
    setFunc(value)
  }
}