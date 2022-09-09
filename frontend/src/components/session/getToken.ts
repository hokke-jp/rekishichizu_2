import { getCookie } from './handleCookie'

export const getToken = () => {
  // Cookieの型(string|undefined)からundefinedを取り除く
  const tokens = getCookie(['uid', 'client', 'access-token']).filter(
    (item): item is string => typeof item === 'string'
  )
  return {
    uid: tokens[0],
    client: tokens[1],
    'access-token': tokens[2]
  }
}
