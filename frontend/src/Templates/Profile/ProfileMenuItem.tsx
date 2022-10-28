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
    <button className="flex items-center w-full px-4 py-2" onClick={handleFunction}>
      <ListItemIcon>{icon}</ListItemIcon>
      {text}
    </button>
  )
}
