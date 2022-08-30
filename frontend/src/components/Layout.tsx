import { SideBar } from './SideBar'
import { Outlet } from 'react-router-dom'

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
