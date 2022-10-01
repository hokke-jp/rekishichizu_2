import { useAlertMessageContext } from './AlertMessageContext'
import { axiosInstance } from 'Utils/axios'
import { getToken, removeCookie } from 'Utils/handleCookie'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface User {
  id: number
  name: string
  introduction: string | null
  avatar_url: string | null
}

const CurrentUserContext = createContext(
  {} as {
    currentUser: User | null
    setCurrentUser: Dispatch<SetStateAction<User | null>>
  }
)

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext)
}

const guestRoutes = ['/login', '/createAccount']

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const location = useLocation()
  const navigate = useNavigate()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  useEffect(() => {
    const { uid, client, 'access-token': accessToken } = getToken()
    // Cookieをチェックし,トークンがあるならログインリクエストを飛ばし,ないならリターン
    if (!accessToken) return
    axiosInstance
      .get('/auth/validate_token', {
        headers: {
          'Content-Type': 'application/json',
          uid,
          client,
          'access-token': accessToken
        }
      })
      .then((response) => {
        setCurrentUser(response.data)
        if (guestRoutes.includes(location.pathname)) {
          navigate('/')
          setAlertSeverity('warning')
          setAlertMessage('ログイン中です')
        }
      })
      .catch((error) => {
        // トークンの期限が切れている等,認証に失敗した場合
        console.error(error)
        removeCookie()
        setCurrentUser(null)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    currentUser,
    setCurrentUser
  }

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
