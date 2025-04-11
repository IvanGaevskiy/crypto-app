export const onCheckboxChange = (setFunc: (value: boolean) => void) => {
  return (e: React.ChangeEvent<HTMLInputElement>) => {
    setFunc(e.target.checked)
  }
}