import Post from 'Images/post.svg'
import { IconWrapper } from 'Parts/IconWrapper'
import { Avatar } from 'Templates/Avatar'
import { User } from 'Utils/CurrentUserContext'

export const LoggedinIcons = ({ user }: { user: User }) => {
  return (
    <>
      <IconWrapper path={user.name} tooltip="マイページ">
        <Avatar url={user.avatar_url} className="h-8 w-8 rounded-full" />
      </IconWrapper>
      <IconWrapper path="post" tooltip="新規投稿">
        <img src={Post} alt="Post icon" className="h-6 w-6" />
      </IconWrapper>
    </>
  )
}