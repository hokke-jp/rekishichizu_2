import { ButtonBase } from '@mui/material'
import { Avatar } from 'Parts/Avatar'
import { Link } from 'react-router-dom'

interface Props {
  path: string
  avatarUrl?: string
  className: string
}

export const AvatarLink = ({ path, avatarUrl = undefined, className }: Props) => {
  return (
    <Link to={path} className={className.concat(' overflow-hidden')}>
      <ButtonBase>
        <Avatar url={avatarUrl} className={className} />
      </ButtonBase>
    </Link>
  )
}
