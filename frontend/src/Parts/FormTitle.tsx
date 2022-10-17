import { Typography } from '@mui/material'
import Logo from 'Images/app_logo.png'

export const FormTitle = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <img className="w-32 rounded-lg" src={Logo} alt="App logo" />
      <Typography component="h1" variant="h5">
        {text}
      </Typography>
    </div>
  )
}
