import clsx from 'clsx'

type ValidationFunc<T extends any[]> = (...args: T) => string | null

type ValidationInputProps<T extends any[]> = {
  className?: string
  isEmpty?: boolean
  validFunc: ValidationFunc<T>
  args: T
}

export const ValidationInput = <T extends any[]>({
  className,
  isEmpty = true,
  validFunc,
  args
}: ValidationInputProps<T>) => {
  const error = validFunc(...args)

  if (isEmpty) return null
  if (!error) return null

  return (
    <div
      className={clsx('rounded-md bg-[#23232377] px-1 py-2 text-xs text-[#ff5858ae]', className)}
    >
      {error}
    </div>
  )
}
