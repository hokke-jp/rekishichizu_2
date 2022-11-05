import { useAlertMessageContext } from './AlertMessageContext'
import { useCurrentUserContext } from './CurrentUserContext'
import { ReactNode, useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export const AuthenticatedGuard = ({ component }: { component: ReactNode }) => {
  const { currentUser } = useCurrentUserContext()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  useEffect(() => {
    if (currentUser) {
      setAlertSeverity('info')
      setAlertMessage('ログイン中です')
    }
  })
  if (currentUser) {
    return <Navigate to="/" replace />
  }

  return <>{component}</>
}
