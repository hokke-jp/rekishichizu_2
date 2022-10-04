import { Avatar } from 'Templates/Avatar'
import { Introduction } from 'Templates/Profile/Introduction'
import { Layout } from 'Templates/Profile/Layout'
import { Name } from 'Templates/Profile/Name'
import { User } from 'Utils/Types'

export const UserProfile = ({ user }: { user: User }) => {
  return (
    <Layout
      avatar={<Avatar url={user.avatar_url} className="h-48 w-48 rounded-full" />}
      name={<Name name={user.name} />}
      introduction={<Introduction introduction={user.introduction} />}
    />
  )
}
