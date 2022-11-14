import { Alert } from 'Templates/Alert'
import { Sidebar } from 'Views/Sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <Alert />
      <div className="flex">
        <Sidebar />
        <div className="grow">
          <Outlet />
        </div>
      </div>
    </>
  )
}
