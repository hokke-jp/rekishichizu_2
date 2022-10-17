// import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { Alert } from 'Utils/Alert'
import { Sidebar } from 'Views/Sidebar'
import { Outlet } from 'react-router-dom'

export const Layout = () => {
  // const { alertMessage, setAlertMessage } = useAlertMessageContext()
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
