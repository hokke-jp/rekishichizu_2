import { TextField } from '@mui/material'

export const NameInput = () => {
  return (
    <TextField
      required
      fullWidth
      id="name"
      label="ユーザー名"
      name="name"
      autoFocus
    />
  )
}
