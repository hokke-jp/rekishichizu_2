import { Alert } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

export const FormAlert = ({
  errorMessage,
  setErrorMessage
}: {
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
}) => {
  return (
    <>
      {errorMessage ? (
        <Alert
          onClose={() => {
            setErrorMessage('')
          }}
          severity="error"
          sx={{ alignItems: 'center' }}
        >
          {errorMessage}
        </Alert>
      ) : null}
    </>
  )
}
