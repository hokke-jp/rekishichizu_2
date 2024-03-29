import { Avatar } from 'Parts/Avatar'
import { Introduction } from 'Templates/Profile/Introduction'
import { Name } from 'Templates/Profile/Name'
import { ProfileLayout } from 'Templates/Profile/ProfileLayout'
import { User } from 'Utils/Types'
import { Follow } from 'Views/Follow'

export const UserProfile = ({ user }: { user: User }) => {
  return (
    <>
      <Follow user={user} />
      <ProfileLayout
        user={user}
        avatar={<Avatar url={user.avatar_url} className="h-48 w-48 rounded-full" />}
        name={<Name name={user.name} />}
        introduction={<Introduction introduction={user.introduction} />}
      />
    </>
  )
}
