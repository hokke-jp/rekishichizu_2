import { ButtonBase } from '@mui/material'
import { MutableRefObject } from 'react'

type Ids = number[] | undefined
type Element = MutableRefObject<HTMLDivElement | null>
interface Props {
  text: string
  ids: Ids
  element: Element
  onClick: (ids: Ids, element: Element) => void
}

export const Status = ({ text, ids, element, onClick }: Props) => {
  return (
    <ButtonBase
      style={{ display: 'block' }}
      onClick={() => {
        onClick(ids, element)
      }}
    >
      <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
        <dt className="order-last text-lg font-medium text-gray-500">{text}</dt>
        <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{ids?.length || 0}</dd>
      </div>
    </ButtonBase>
  )
}
