import { axiosInstance } from '../../utils/axios'
import { getToken } from './getToken'
import { removeCookie, setCookie } from './handleCookie'

interface Data {
  email: string | undefined
  password: string | undefined
}
export const login = async (data: Data) => {
  return await axiosInstance
    .post('/auth/sign_in', {
      email: data.email,
      password: data.password
    })
    .then((response) => {
      const keysAndValues = [
        { key: 'uid', value: response.headers.uid },
        { key: 'client', value: response.headers.client },
        { key: 'access-token', value: response.headers['access-token'] }
      ]
      setCookie(keysAndValues)
      return response
    })
}

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
      removeCookie(['uid', 'client', 'access-token'])
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
      removeCookie(['uid', 'client', 'access-token'])
    })
    .catch((error) => {
      console.error(error)
      removeCookie(['uid', 'client', 'access-token'])
      throw new Error(error)
    })
}
