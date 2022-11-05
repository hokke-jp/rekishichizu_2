import { EditableAvatar } from 'Templates/Profile/EditableAvatar'
import { EditableIntroduction } from 'Templates/Profile/EditableIntroduction'
import { EditableName } from 'Templates/Profile/EditableName'
import { ProfileLayout } from 'Templates/Profile/ProfileLayout'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { ProfileMenu } from 'Views/ProfileMenu'

export const MyProfile = () => {
  const { currentUser } = useCurrentUserContext()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = currentUser!

  return (
    <>
      <ProfileMenu />
      <ProfileLayout
        user={user}
        avatar={<EditableAvatar />}
        name={<EditableName />}
        introduction={<EditableIntroduction />}
      />
    </>
  )
}
