import { EditableAvatar } from 'Templates/Profile/EditableAvatar'
import { EditableIntroduction } from 'Templates/Profile/EditableIntroduction'
import { EditableName } from 'Templates/Profile/EditableName'
import { Layout } from 'Templates/Profile/Layout'
import { ProfileMenu } from 'Views/ProfileMenu'

export const MyProfile = () => {
  return (
    <>
      <ProfileMenu />
      <Layout avatar={<EditableAvatar />} name={<EditableName />} introduction={<EditableIntroduction />} />
    </>
  )
}
