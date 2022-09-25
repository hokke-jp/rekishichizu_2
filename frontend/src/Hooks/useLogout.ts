import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { getToken, removeCookie } from 'Utils/handleCookie'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const tokens = getToken()
  const { setCurrentUser } = useCurrentUserContext()
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const navigate = useNavigate()
  const logout = () => {
    axiosInstance
      .delete('/auth/sign_out', {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        removeCookie()
        setCurrentUser(null)
        navigate('/')
        setAlertSeverity('info')
        setAlertMessage('ログアウトしました')
      })
  }
  return { logout }
}
