import { TextField } from '@mui/material'

export const EmailInput = ({ autoFocus = false }: { autoFocus?: boolean }) => {
  return (
    <TextField
      margin="none"
      required
      fullWidth
      id="email"
      label="メールアドレス"
      name="email"
      autoComplete="email"
      autoFocus={autoFocus}
    />
  )
}
