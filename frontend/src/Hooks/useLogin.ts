import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { setCookie } from 'Utils/handleCookie'
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const { setCurrentUser } = useCurrentUserContext()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const login = (email: string | undefined, password: string | undefined) => {
    axiosInstance
      .post('/auth/sign_in', {
        email,
        password
      })
      .then((response) => {
        const headers = response.headers
        setCookie([headers.uid, headers.client, headers['access-token']])
        setCurrentUser(response.data.data)
        navigate(`/`)
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage('メールアドレスもしくはパスワードに誤りがあります')
      })
  }
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    const data = new FormData(event.currentTarget)
    login(data.get('email')?.toString(), data.get('password')?.toString())
  }

  return { errorMessage, setErrorMessage, handleLogin }
}
