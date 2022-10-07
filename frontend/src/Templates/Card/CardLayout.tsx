import { ReactNode } from 'react'

interface Props {
  image: ReactNode
  title: ReactNode
  avatar: ReactNode
  userName: ReactNode
  createdTime: ReactNode
  like: ReactNode
  handleOpen?: () => void
}

export const CardLayout = ({ image, title, avatar, userName, createdTime, like, handleOpen }: Props) => {
  return (
    <div onDoubleClick={handleOpen} className="w-52 min-h-[256px] border rounded-md shadow-md overflow-hidden">
      {image}
      <div className="pt-4 px-3">
        {title}
        <div className="flex items-center pt-3 gap-1">
          {avatar}
          <div className="grow max-w-[138px]">
            {userName}
            <div className="flex items-center justify-between">
              {createdTime}
              <div className="flex items-center">{like}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
