import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { removeCookies, setCookies } from 'Utils/handleCookie'
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { setCurrentUser } = useCurrentUserContext()
  const handleSignup = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    const data = new FormData(event.currentTarget)
    axiosInstance
      .post('/auth', {
        name: data.get('name'),
        email: data.get('email'),
        password: data.get('password')
      })
      .then((response) => {
        const headers = response.headers
        const user = response.data.data
        setCookies([headers.uid, headers.client, headers['access-token']], user)
        setCurrentUser(user)
        navigate(`/${user.name}`)
        setAlertSeverity('success')
        setAlertMessage('アカウントを作成しました')
      })
      .catch((error) => {
        console.error(error)
        removeCookies()
        setErrorMessage(error.response.data.errors.full_messages.join('\n'))
      })
  }
  return { errorMessage, setErrorMessage, handleSignup }
}
