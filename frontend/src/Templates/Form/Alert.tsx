import { Alert as MuiAlert } from '@mui/material'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  errorMessage: string
  setErrorMessage: Dispatch<SetStateAction<string>>
  // className?: string
}

export const Alert = ({ errorMessage, setErrorMessage }: Props) => {
  return errorMessage ? (
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
  ) : null
}
