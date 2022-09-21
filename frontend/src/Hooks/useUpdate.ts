import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { getToken, setCookie } from 'Utils/handleCookie'
import { useState, FormEvent, Dispatch, SetStateAction } from 'react'

export const useUpdate = (
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
) => {
  const [open, setOpen] = useState(false)
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }
  const tokens = getToken()
  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const password = data.get('password')
    const email = data.get('email')
    const params = password ? { password } : { email }
    axiosInstance
      .patch('/auth', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        setCurrentUser(response.data)
        const headers = response.headers
        setCookie([headers.uid, headers.client, headers['access-token']])
      })
      .catch((error) => {
        console.error(error.response.data)
      })
    setOpen(false)
    setAnchorEl(null)
  }

  return { currentUser, open, handleOpen, handleClose, handleUpdate }
}
