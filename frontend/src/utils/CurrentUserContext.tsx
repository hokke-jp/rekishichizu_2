import { useAlertMessageContext } from './AlertMessageContext'
import { User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens, getUserSeesionStorage, removeCookies, setCookies } from 'Utils/handleCookie'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

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
const userCookies = getUserSeesionStorage()
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isUser = (possibleUser: any): possibleUser is User => {
  // id と name しか検査していないため不十分かもしれない
  return typeof possibleUser.id === 'number' && typeof possibleUser.name === 'string'
}
const user = isUser(userCookies) ? userCookies : undefined

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(user)
  const location = useLocation()
  const navigate = useNavigate()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  useEffect(() => {
    const tokens = getTokens()
    // Cookieをチェックし,トークンがあるなら認証リクエストを飛ばし,ないならリターン
    if (!tokens.uid || !tokens.client || !tokens['access-token']) return
    axiosInstance
      .get('/auth/validate_token', {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        console.log(response)
        const headers = response.headers
        const user = response.data
        setCookies([headers.uid, headers.client, headers['access-token']], user)
        setCurrentUser(user)
        if (guestRoutes.includes(location.pathname)) {
          navigate('/')
          setAlertSeverity('info')
          setAlertMessage('ログイン中です')
        }
      })
      .catch((error) => {
        // トークンの期限が切れている等,認証に失敗した場合
        console.error(error)
        setAlertSeverity('info')
        setAlertMessage('ログインがタイムアウトしました')
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
