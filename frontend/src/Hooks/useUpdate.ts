import { axiosInstance } from 'Utils/axios'
import { getToken, setCookie } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
  useContext
} from 'react'

export const useUpdate = (
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
) => {
  const [open, setOpen] = useState(false)
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
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
        const headers = response.headers
        setCurrentUser(response.data)
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
