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
    <section className="flex flex-col items-center pt-16 px-20">
      {avatar}
      <hr className="h-10" />
      {name}
      <hr className="h-5" />
      <div className="w-3/4 text-center">{introduction}</div>
      <hr className="h-20" />
      <Status />
    </section>
  )
}
