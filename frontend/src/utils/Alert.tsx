import { Alert as MuiAlert } from '@mui/material'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useEffect } from 'react'

export const Alert = () => {
  const { alertSeverity, alertMessage, setAlertMessage } = useAlertMessageContext()
  const check = Boolean(alertMessage)
  useEffect(() => {
    if (!alertMessage) return
    const timeOut = setTimeout(() => {
      setAlertMessage('')
    }, 5000)
    return () => {
      clearTimeout(timeOut)
    }
  }, [alertMessage, setAlertMessage])
  return (
    <>
      <input id="alert-checkbox" type="checkbox" checked={check} readOnly hidden />
      <div id="alert-div" onClick={() => setAlertMessage('')}>
        <MuiAlert severity={alertSeverity} sx={{ alignItems: 'center' }}>
          {alertMessage}
        </MuiAlert>
      </div>
    </>
  )
}
