import { axiosInstance } from 'Utils/axios'
import { getToken, removeCookie } from 'components/session/handleCookie'

export const loginWithCookie = async () => {
  const tokens = getToken()
  return await axiosInstance
    .get('/auth/validate_token', {
      headers: {
        'Content-Type': 'application/json',
        ...tokens
      }
    })
    .catch((error) => {
      // トークンの期限が切れている等,認証に失敗した場合
      removeCookie()
      throw new Error(error)
    })
}

export const logout = async () => {
  const tokens = getToken()
  return await axiosInstance
    .delete('/auth/sign_out', {
      headers: {
        'Content-Type': 'application/json',
        ...tokens
      }
    })
    .then(() => {
      removeCookie()
    })
    .catch((error) => {
      console.error(error)
      removeCookie()
      throw new Error(error)
    })
}
