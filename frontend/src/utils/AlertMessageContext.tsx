import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

type AlertColor = 'success' | 'info' | 'warning' | 'error'

const AlertMessageContext = createContext(
  {} as {
    alertSeverity: AlertColor
    alertMessage: string
    setAlertSeverity: Dispatch<SetStateAction<AlertColor>>
    setAlertMessage: Dispatch<SetStateAction<string>>
  }
)

export const useAlertMessageContext = () => {
  return useContext(AlertMessageContext)
}

export const AlertMessageProvider = ({ children }: { children: ReactNode }) => {
  const [alertMessage, setAlertMessage] = useState('')
  const [alertSeverity, setAlertSeverity] = useState<AlertColor>('success')
  const value = {
    alertSeverity,
    alertMessage,
    setAlertSeverity,
    setAlertMessage
  }

  return <AlertMessageContext.Provider value={value}>{children}</AlertMessageContext.Provider>
}
