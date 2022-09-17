import { axiosInstance } from 'Utils/axios'
import { removeCookie, setCookie } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import { useState, useContext, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useSignup = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { setCurrentUser } = useContext(CurrentUserContext)
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
        setCookie([headers.uid, headers.client, headers['access-token']])
        setCurrentUser(response.data.data)
        navigate(`/${response.data.data.name}`)
      })
      .catch((error) => {
        console.error(error)
        removeCookie()
        setErrorMessage(error.response.data.errors.full_messages.join('\n'))
      })
  }
  return { errorMessage, setErrorMessage, handleSignup }
}
