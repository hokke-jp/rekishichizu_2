import { AppLogo } from 'Parts/AppLogo'
import { ReactNode } from 'react'

export const Layout = ({ icons }: { icons: ReactNode }) => {
  return (
    <aside className="sticky top-0 left-0 z-30 flex flex-col items-center justify-between h-screen min-w-[72px] pt-12 pb-6 bg-white shadow-xl shadow-gray-300">
      <AppLogo className="h-12 w-12 rounded-md" />
      <div className="flex flex-col w-full">{icons}</div>
    </aside>
  )
}
