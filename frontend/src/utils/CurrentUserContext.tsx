import { axiosInstance } from 'Utils/axios'
import { getToken, removeCookie } from 'Utils/handleCookie'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'

export interface User {
  id: number
  provider: 'email'
  uid: string
  allow_password_change: boolean
  name: string
  email: string
  image: string | null
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
export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const { uid, client, 'access-token': accessToken } = getToken()
  useEffect(() => {
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
      })
      .catch((error) => {
        // トークンの期限が切れている等,認証に失敗した場合
        console.error(error)
        removeCookie()
        setCurrentUser(null)
      })
  }, [uid, client, accessToken])

  const value = {
    currentUser,
    setCurrentUser
  }

  return <CurrentUserContext.Provider value={value}>{children}</CurrentUserContext.Provider>
}
