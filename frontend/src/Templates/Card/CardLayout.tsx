import { SkeltonModal } from 'Templates/Modal/SkeltonModal'
import { ReactNode, useState } from 'react'

interface Props {
  image: ReactNode
  title: ReactNode
  avatar: ReactNode
  userName: ReactNode
  createdAt: ReactNode
  like: ReactNode
}

export const CardLayout = ({ image, title, avatar, userName, createdAt, like }: Props) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <li className="w-52 min-h-[256px] border rounded-md shadow-md overflow-hidden" onDoubleClick={handleOpen}>
      {image}
      <div className="pt-4 px-3">
        {title}
        <div className="flex items-center pt-3 gap-1">
          {avatar}
          <div className="grow max-w-[138px]">
            {userName}
            <div className="flex items-center justify-between">
              {createdAt}
              <div className="flex items-center">{like}</div>
            </div>
          </div>
        </div>
      </div>
      <SkeltonModal open={open} handleClose={handleClose} />
    </li>
  )
}
