import { User } from 'Utils/Types'
import Cookies from 'js-cookie'

export const setCookies = (tokens: string[], user: User) => {
  Cookies.set('uid', tokens[0])
  Cookies.set('client', tokens[1])
  Cookies.set('accessToken', tokens[2])
  sessionStorage.setItem('id', user.id?.toString() || '')
  sessionStorage.setItem('name', user.name || '')
  sessionStorage.setItem('introduction', user.introduction || '')
  sessionStorage.setItem('avatar_url', user.avatar_url || '')
  sessionStorage.setItem('article_ids', user.article_ids?.join(',') || '')
  sessionStorage.setItem('liking_article_ids', user.liking_article_ids?.join(',') || '')
  sessionStorage.setItem('following_ids', user.following_ids?.join(',') || '')
}

export const removeCookies = () => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('accessToken')
  sessionStorage.clear()
}

const getStorage = (key: string) => sessionStorage.getItem(key)
export const getUserSeesionStorage = () => {
  return {
    id: Number(getStorage('id')) || undefined,
    name: getStorage('name') || undefined,
    introduction: getStorage('introduction') || undefined,
    avatar_url: getStorage('avatar_url') || undefined,
    article_ids:
      getStorage('article_ids')
        ?.split(',')
        .map((id) => {
          return Number(id)
        }) || undefined,
    liking_article_ids:
      getStorage('liking_article_ids')
        ?.split(',')
        .map((id) => {
          return Number(id)
        }) || undefined,
    following_ids:
      getStorage('following_ids')
        ?.split(',')
        .map((id) => {
          return Number(id)
        }) || undefined
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
