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
      {/* onClick={...} はプロフィールページで他ユーザーページに遷移した際にスクロール位置が元の位置のままになる症状の対策 */}
      <ButtonBase onClick={() => window.scrollTo(0, 0)}>
        <Avatar url={avatarUrl} className={className} />
      </ButtonBase>
    </Link>
  )
}
