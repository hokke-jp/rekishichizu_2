import { axiosInstance } from '../../utils/axios'
import Cookies from 'js-cookie'

interface Data {
  email: string | undefined
  password: string | undefined
}

export const loginWithInput = async (data: Data) => {
  return await axiosInstance
    .post('/auth/sign_in', {
      email: data.email,
      password: data.password
    })
    .then((response) => {
      Cookies.set('uid', response.headers.uid)
      Cookies.set('client', response.headers.client)
      Cookies.set('access-token', response.headers['access-token'])
      return response
    })
}
