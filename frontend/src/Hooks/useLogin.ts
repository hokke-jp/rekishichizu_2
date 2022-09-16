import { axiosInstance } from 'Utils/axios'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import Cookies from 'js-cookie'
import { useContext, useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useLogin = () => {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  const handleLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    axiosInstance
      .post('/auth/sign_in', {
        email: data.get('email')?.toString(),
        password: data.get('password')?.toString()
      })
      .then((response) => {
        Cookies.set('uid', response.headers.uid)
        Cookies.set('client', response.headers.client)
        Cookies.set('access-token', response.headers['access-token'])
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
