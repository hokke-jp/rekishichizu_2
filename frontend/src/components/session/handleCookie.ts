import Cookies from 'js-cookie'

interface KeyAndValue {
  key: string
  value: string
}

export const setCookie = (keysAndValues: KeyAndValue[]): void => {
  keysAndValues.forEach((keyAndValue) => {
    Cookies.set(keyAndValue.key, keyAndValue.value)
  })
}

export const removeCookie = (keys: string[]): void => {
  keys.forEach((key) => {
    Cookies.remove(key)
  })
}

export const getCookie = (keys: string[]): (string | undefined)[] => {
  return keys.map((key: string) => {
    return Cookies.get(key)
  })
}
