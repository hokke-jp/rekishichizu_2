import { axiosInstance } from 'Utils/axios'
import { setCookie } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import { useContext, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    const data = new FormData(event.currentTarget)
    axiosInstance
      .post('/auth/sign_in', {
        email: data.get('email')?.toString(),
        password: data.get('password')?.toString()
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

  return { errorMessage, setErrorMessage, handleLogin }
}
