import { axiosInstance } from 'Utils/axios'
import { User, CurrentUserContext } from 'components/user/CurrentUserContext'
import { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const useProfile = () => {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useContext(CurrentUserContext)
  useEffect(() => {
    axiosInstance
      .get(`/users/${params.userName}`, {})
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [params.userName])
  const isMypage = currentUser?.name === user?.name
  return { isLoading, isMypage, user }
}
