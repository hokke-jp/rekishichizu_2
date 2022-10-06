import { Status } from 'Templates/Profile/Status'
import { ReactNode } from 'react'

export const Layout = ({
  avatar,
  name,
  introduction
}: {
  avatar: ReactNode
  name: ReactNode
  introduction: ReactNode
}) => {
  return (
    <section className="flex flex-col items-center py-16 px-20">
      {avatar}
      <hr className="h-14" />
      {name}
      <hr className="h-14" />
      <div className="w-1/2 text-center">{introduction}</div>
      <hr className="h-24" />
      <Status />
    </section>
  )
}
