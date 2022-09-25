import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { getToken } from 'Utils/handleCookie'
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
    const tokens = getToken()
    return axiosInstance
      .patch('/auth', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        setCurrentUser(response.data)
        setOpen(false)
        setAnchorEl && setAnchorEl(null)
        setAlertSeverity('info')
        setAlertMessage('更新しました')
        return response
      })
      .catch((error) => {
        setAlertMessage(error.response.data.errors.full_messages)
        setAlertSeverity('warning')
        throw new Error(error)
      })
  }

  return { currentUser, open, handleOpen, handleClose, update }
}
const getParams = (data: FormData) => {
  if (data.get('name')) return { name: data.get('name') }
  if (data.get('email')) return { email: data.get('email') }
  if (data.get('password')) return { password: data.get('password') }
  return { introduction: data.get('introduction') }
}
