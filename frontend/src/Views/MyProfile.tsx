import { ProfileEditableAvatar } from 'Templates/ProfileEditableAvatar'
import { ProfileEditableIntroducation } from 'Templates/ProfileEditableIntroducation'
import { ProfileEditableName } from 'Templates/ProfileEditableName'
import { ProfileLayout } from 'Templates/ProfileLayout'
import { ProfileMenu } from 'Views/ProfileMenu'

export const MyProfile = () => {
  return (
    <>
      <ProfileMenu />
      <ProfileLayout
        avatar={<ProfileEditableAvatar />}
        name={<ProfileEditableName />}
        introduction={<ProfileEditableIntroducation />}
      />
    </>
  )
}
