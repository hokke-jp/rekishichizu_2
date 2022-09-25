import Cookies from 'js-cookie'

export const setCookie = (tokens: string[]) => {
  Cookies.set('uid', tokens[0])
  Cookies.set('client', tokens[1])
  Cookies.set('accessToken', tokens[2])
}

export const removeCookie = () => {
  Cookies.remove('uid')
  Cookies.remove('client')
  Cookies.remove('accessToken')
}

export const getToken = () => {
  const cookies = [Cookies.get('uid'), Cookies.get('client'), Cookies.get('accessToken')]
  // Cookieの型(string|undefined)からundefinedを取り除く
  const tokens = cookies.filter((item): item is string => typeof item === 'string')
  return {
    uid: tokens[0],
    client: tokens[1],
    'access-token': tokens[2]
  }
}
