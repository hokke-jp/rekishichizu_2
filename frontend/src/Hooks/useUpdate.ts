import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { getTokens, setCookies } from 'Utils/handleCookie'
import { useState, FormEvent, Dispatch, SetStateAction } from 'react'

export const useUpdate = (setAnchorEl?: Dispatch<SetStateAction<null | HTMLElement>>) => {
  const [open, setOpen] = useState(false)
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setAnchorEl && setAnchorEl(null)
  }
  const update = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = getParams(data)
    if (!params) {
      setAlertMessage('入力してください')
      setAlertSeverity('warning')
      return new Promise((resolve, reject) => {
        reject(new Error('無効な入力'))
      })
    }
    const tokens = getTokens()
    return axiosInstance
      .patch('/auth', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        const headers = response.headers
        const user = response.data
        setCookies([headers.uid, headers.client, headers['access-token']], user)
        setCurrentUser(user)
        setOpen(false)
        setAnchorEl && setAnchorEl(null)
        setAlertSeverity('info')
        setAlertMessage('更新しました')
        return response.headers.uid
      })
      .catch((error) => {
        const message = error.response.data.errors?.full_messages || '更新に失敗しました'
        setAlertMessage(message)
        setAlertSeverity('warning')
        throw new Error(error)
      })
  }

  return { currentUser, open, handleOpen, handleClose, update }
}
const getParams = (data: FormData) => {
  if (data.get('name')) return { name: data.get('name') }
  if (data.get('introduction')) return { introduction: data.get('introduction') }
  if (data.get('email')) return { email: data.get('email') }
  if (data.get('password')) return { password: data.get('password') }
  return null
}
