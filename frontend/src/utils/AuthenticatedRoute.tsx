import { useAlertMessageContext } from './AlertMessageContext'
import { useCurrentUserContext } from './CurrentUserContext'
import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export const AuthenticatedRoute = ({ component }: { component: ReactNode }) => {
  const { currentUser } = useCurrentUserContext()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  useEffect(() => {
    if (!currentUser) {
      setAlertSeverity('warning')
      setAlertMessage('ログインが必要です')
    }
  })
  if (!currentUser) {
    return <Navigate to="/login" replace />
  }
  return <>{component}</>
}
