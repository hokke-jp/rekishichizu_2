import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { setCookies } from 'Utils/handleCookie'
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const { setCurrentUser } = useCurrentUserContext()
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const login = (email: string | undefined, password: string | undefined) => {
    axiosInstance
      .post('/auth/sign_in', {
        email,
        password
      })
      .then((response) => {
        console.log(response)
        const headers = response.headers
        const user = response.data.data
        setCookies([headers.uid, headers.client, headers['access-token']], user)
        setCurrentUser(user)
        navigate(`/`, { replace: true })
        setAlertSeverity('info')
        setAlertMessage('ログインしました')
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
