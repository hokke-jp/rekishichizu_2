import { createContext } from 'react'
export interface User {
  id: number
  provider: 'email'
  uid: string
  allow_password_change: boolean
  name: string
  email: string
  image: string | null
  introduction: string | null
}

export const CurrentUserContext = createContext(
  {} as {
    currentUser: User | null
    setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>
  }
)
