import { EditableAvatar } from 'Templates/Profile/EditableAvatar'
import { EditableIntroduction } from 'Templates/Profile/EditableIntroduction'
import { EditableName } from 'Templates/Profile/EditableName'
import { Layout } from 'Templates/Profile/Layout'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { ProfileMenu } from 'Views/ProfileMenu'

export const MyProfile = () => {
  const { currentUser } = useCurrentUserContext()

  return (
    <>
      <ProfileMenu />
      <Layout
        avatar={<EditableAvatar />}
        name={<EditableName />}
        introduction={<EditableIntroduction />}
        articleIds={currentUser?.article_ids}
        likingArticleIds={currentUser?.liking_article_ids}
        followingIds={currentUser?.following_ids}
      />
    </>
  )
}
