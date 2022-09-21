import { Avatar } from 'Templates/Avatar'
import { ProfileIntroduction } from 'Templates/ProfileIntroduction'
import { ProfileLayout } from 'Templates/ProfileLayout'
import { ProfileName } from 'Templates/ProfileName'
import { User } from 'Utils/CurrentUserContext'

export const UserProfile = ({ user }: { user: User }) => {
  return (
    <ProfileLayout
      avatar={
        <Avatar url={user.avatar_url} className="h-48 w-48 rounded-full" />
      }
      name={<ProfileName name={user.name} />}
      introduction={<ProfileIntroduction introduction={user.introduction} />}
    />
  )
}
