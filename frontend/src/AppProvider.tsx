import { CurrentUserProvider } from 'Utils/CurrentUserContext'
import { ReactNode } from 'react'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return <CurrentUserProvider>{children}</CurrentUserProvider>
}
