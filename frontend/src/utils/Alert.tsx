import { Alert as MuiAlert } from '@mui/material'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useEffect } from 'react'

export const Alert = () => {
  const { alertSeverity, alertMessage, setAlertMessage } = useAlertMessageContext()
  useEffect(() => {
    if (!alertMessage) return
    setTimeout(() => {
      setAlertMessage('')
    }, 5000)
  }, [alertMessage, setAlertMessage])
  return (
    <>
      <input id="alert-checkbox" type="checkbox" checked={!!alertMessage} readOnly hidden />
      <div id="alert-div" onClick={() => setAlertMessage('')}>
        <MuiAlert severity={alertSeverity} sx={{ alignItems: 'center' }}>
          {alertMessage}
        </MuiAlert>
      </div>
    </>
  )
}
