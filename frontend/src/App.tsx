import { AppRoutes } from 'AppRoutes'
import { loginWithCookie } from 'components/session/session'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import type { User } from 'components/user/CurrentUserContext'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'

export const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const token = Cookies.get('access-token')
  useEffect(() => {
    // Cookieをチェックし,トークンがあるならログインリクエストを飛ばし,ないならリターン
    if (!token) return
    loginWithCookie()
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch(() => {
        setCurrentUser(null)
      })
  }, [token])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <AppRoutes />
    </CurrentUserContext.Provider>
  )
}
