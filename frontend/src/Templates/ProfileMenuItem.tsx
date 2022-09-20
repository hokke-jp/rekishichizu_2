import { ListItemIcon } from '@mui/material'
import { ReactNode } from 'react'

export const ProfileMenuItem = ({
  handleFunction,
  icon,
  text
}: {
  handleFunction: () => void
  icon: ReactNode
  text: string
}) => {
  return (
    <button className="flex items-center" onClick={handleFunction}>
      <ListItemIcon>{icon}</ListItemIcon>
      {text}
    </button>
  )
}
