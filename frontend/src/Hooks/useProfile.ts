import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const useProfile = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser } = useCurrentUserContext()
  const params = useParams()
  const isMypage = currentUser?.name === params.userName

  // fetchUser
  useEffect(() => {
    if (isMypage) {
      setIsLoading(false)
      return
    }
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
  }, [currentUser, isMypage, params.userName])

  return { isLoading, isMypage, user }
}
