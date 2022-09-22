import { Alert as MuiAlert } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export const Alert = ({
  errorMessage,
  setErrorMessage
}: {
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
}) => {
  return (
    <>
      {errorMessage ? (
        <MuiAlert
          onClose={() => {
            setErrorMessage('')
          }}
          severity="error"
          sx={{ alignItems: 'center' }}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {errorMessage}
        </MuiAlert>
      ) : null}
    </>
  )
}
