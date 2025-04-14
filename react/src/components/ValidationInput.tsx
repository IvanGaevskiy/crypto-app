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
  args,
}: ValidationInputProps<T>) => {
  const error = validFunc(...args)

  if (isEmpty) return null
  if (!error) return null

  return (
    <div
      className={clsx(
        'rounded-md text-red-400 border bg-[#000000b0] p-1 text-xs',
        className
      )}
    >
      {error}
    </div>
  )
}
