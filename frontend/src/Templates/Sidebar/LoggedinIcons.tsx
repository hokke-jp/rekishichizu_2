import Post from 'Images/post.svg'
import { Avatar } from 'Parts/Avatar'
import { IconWrapper } from 'Parts/IconWrapper'
import { User } from 'Utils/Types'

export const LoggedinIcons = ({ user }: { user: User }) => {
  return (
    <>
      <IconWrapper path={user.name as string} tooltip="マイページ">
        <Avatar url={user.avatar_url} className="h-8 w-8 rounded-full" />
      </IconWrapper>
      <IconWrapper path="post" tooltip="投稿作成">
        <img src={Post} alt="Post icon" className="h-6 w-6" />
      </IconWrapper>
    </>
  )
}
