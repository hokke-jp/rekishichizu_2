import { User } from 'Utils/CurrentUserContext'
import Cookies from 'js-cookie'

export const setCookies = (tokens: string[], user: User) => {
  Cookies.set('uid', tokens[0])
  Cookies.set('client', tokens[1])
  Cookies.set('accessToken', tokens[2])
  Cookies.set('id', user.id?.toString() || '')
  Cookies.set('name', user.name || '')
  Cookies.set('avatar_url', user.avatar_url || '')
  Cookies.set('introduction', user.introduction || '')
}

export const removeCookies = () => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('accessToken')
  Cookies.remove('id')
  Cookies.remove('name')
  Cookies.remove('avatar_url')
  Cookies.remove('introduction')
}

export const getUserCookies = () => {
  return {
    id: Number(Cookies.get('id')) || undefined,
    name: Cookies.get('name') || undefined,
    introduction: Cookies.get('introduction') || undefined,
    avatar_url: Cookies.get('avatar_url') || undefined
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
