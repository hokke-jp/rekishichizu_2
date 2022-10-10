import { Typography } from '@mui/material'
import { AvatarLink } from 'Parts/AvatarLink'
import { UserInList } from 'Utils/Types'

interface Props {
  user: UserInList
}
export const UserListElement = ({ user }: Props) => {
  return (
    <div className="flex gap-x-3 items-center p-3">
      <AvatarLink path={`/${user.name}`} avatarUrl={user.avatar_url} className="shrink-0 w-10 h-10 rounded-full" />
      <Typography noWrap>{user.name}</Typography>
    </div>
  )
}
