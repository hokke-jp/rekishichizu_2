import { Button } from '@mui/material'

export const FormButton = ({ text }: { text: string }) => {
  return (
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 4 }}>
      {text}
    </Button>
  )
}
