import { useAlertMessageContext } from './AlertMessageContext'
import { axiosInstance } from 'Utils/axios'
import { getTokens, getUserCookies, removeCookies } from 'Utils/handleCookie'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export interface User {
  id: number | undefined
  name: string | undefined
  introduction: string | undefined
  avatar_url: string | undefined
}

const userCookies: User = getUserCookies()
const user = userCookies.id ? userCookies : undefined

const CurrentUserContext = createContext(
  {} as {
    currentUser: User | undefined
    setCurrentUser: Dispatch<SetStateAction<User | undefined>>
  }
)

export const useCurrentUserContext = () => {
  return useContext(CurrentUserContext)
}

const guestRoutes = ['/login', '/createAccount']

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(user)
  const location = useLocation()
  const navigate = useNavigate()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  useEffect(() => {
    const { uid, client, 'access-token': accessToken } = getTokens()
    // Cookieをチェックし,トークンがあるなら認証リクエストを飛ばし,ないならリターン
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
          setAlertSeverity('info')
          setAlertMessage('ログイン中です')
        }
      })
      .catch((error) => {
        // トークンの期限が切れている等,認証に失敗した場合
        console.error(error)
        removeCookies()
        setCurrentUser(undefined)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const value = {
    currentUser,
    setCurrentUser
  }

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
