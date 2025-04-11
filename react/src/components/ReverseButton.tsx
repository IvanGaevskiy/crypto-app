import clsx from 'clsx'
import { ReactSVG } from 'react-svg'
import { getPath } from '../utils/getPath'

type ButtonProps = {
  colorLeft: string
  colorRight: string
  onClick: () => void
}
export const ReverseButton = ({colorLeft, colorRight, onClick
}: ButtonProps) => {
  return (
    <button className={clsx('cursor-pointer')} onClick={onClick}>
      <ReactSVG
        src={getPath('arrow_left.svg')}
        className={clsx('mr-1 h-[16px] w-[16px]', colorLeft)}
      />
      <ReactSVG
        src={getPath('arrow_right.svg')}
        className={clsx('mr-1 h-[16px] w-[16px]', colorRight)}
      />
    </button>
  )
}
