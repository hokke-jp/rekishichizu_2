import { User } from 'Utils/CurrentUserContext'
import Cookies from 'js-cookie'

export const setCookies = (tokens: string[], user: User) => {
  Cookies.set('uid', tokens[0])
  Cookies.set('client', tokens[1])
  Cookies.set('accessToken', tokens[2])
  sessionStorage.setItem('id', user.id?.toString() || '')
  sessionStorage.setItem('name', user.name || '')
  sessionStorage.setItem('avatar_url', user.avatar_url || '')
  sessionStorage.setItem('introduction', user.introduction || '')
}

export const removeCookies = () => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('accessToken')
  sessionStorage.clear()
}

export const getUserSeesionStorage = () => {
  return {
    id: Number(sessionStorage.getItem('id')) || undefined,
    name: sessionStorage.getItem('name') || undefined,
    introduction: sessionStorage.getItem('introduction') || undefined,
    avatar_url: sessionStorage.getItem('avatar_url') || undefined
  }
}

export const getTokens = () => {
  const cookies = [Cookies.get('uid'), Cookies.get('client'), Cookies.get('accessToken')]
  // Cookieの型(string|undefined)からundefinedを取り除く
  const tokens = cookies.filter((item): item is string => typeof item === 'string')
  return {
    uid: tokens[0],
    client: tokens[1],
    'access-token': tokens[2]
  }
}
