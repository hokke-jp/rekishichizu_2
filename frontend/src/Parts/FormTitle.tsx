import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Avatar, Typography } from '@mui/material'

export const FormTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        {text}
      </Typography>
    </div>
  )
}
