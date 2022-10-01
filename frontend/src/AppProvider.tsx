import { AlertMessageProvider } from 'Utils/AlertMessageContext'
import { CurrentUserProvider } from 'Utils/CurrentUserContext'
import { ReactNode } from 'react'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AlertMessageProvider>
      <CurrentUserProvider>{children}</CurrentUserProvider>
    </AlertMessageProvider>
  )
}
