import { axiosInstance } from 'Utils/axios'
import { getToken, removeCookie } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogout = () => {
  const tokens = getToken()
  const { setCurrentUser } = useContext(CurrentUserContext)
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
      })
  }
  return { logout }
}
