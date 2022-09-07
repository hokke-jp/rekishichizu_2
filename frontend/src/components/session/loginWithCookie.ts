import { axiosInstance } from '../../utils/axios'
import Cookies from 'js-cookie'

export const loginWithCookie = async () => {
  // Cookieの型(string|undefined)からundefinedを取り除く
  const tokens = [
    Cookies.get('uid'),
    Cookies.get('client'),
    Cookies.get('access-token')
  ].filter((item): item is string => typeof item === 'string')
  return await axiosInstance
    .get('/auth/validate_token', {
      headers: {
        'Content-Type': 'application/json',
        uid: tokens[0],
        client: tokens[1],
        // keyにハイフンを含む場合そのまま記述するとエラー発生
        // eslint-disable-next-line no-useless-computed-key
        ['access-token']: tokens[2]
      }
    })
    .catch((error) => {
      // トークンの期限が切れている等,認証に失敗した場合
      Cookies.remove('uid')
      Cookies.remove('client')
      Cookies.remove('access-token')
      throw new Error(error)
    })
}
