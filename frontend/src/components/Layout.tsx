import { Outlet } from 'react-router-dom'
import { SideBar } from './SideBar'

export const Layout = () => {
  return (
    <div className="h-screen w-screen flex">
      <SideBar />
      <div className="grow">
        <Outlet />
      </div>
    </div>
  )
}
