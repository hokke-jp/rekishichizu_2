import { ButtonBase } from '@mui/material'
import { Avatar } from 'Parts/Avatar'
import { Link } from 'react-router-dom'

interface Props {
  path: string
  className: string
  avatarUrl?: string
  resetOpenModal?: () => void
}

export const AvatarLink = ({ path, className, avatarUrl = undefined, resetOpenModal = undefined }: Props) => {
  return (
    <Link to={path} className={className.concat(' overflow-hidden')}>
      <ButtonBase
        onClick={() => {
          window.scrollTo(0, 0)
          resetOpenModal && resetOpenModal()
        }}
      >
        <Avatar url={avatarUrl} className={className} />
      </ButtonBase>
    </Link>
  )
}
