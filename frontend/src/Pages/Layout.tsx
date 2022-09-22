import { Sidebar } from 'Views/Sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <div className="flex">
      <div className="w-[72px]" />
      <Sidebar />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}
