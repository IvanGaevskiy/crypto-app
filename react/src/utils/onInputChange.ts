export const onInputChange = (setFunc: (value: string) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunc(e.target.value)
  }
}