import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import { ButtonBase } from '@mui/material'
import { Avatar } from 'Templates/Avatar'
import { axiosInstance } from 'Utils/axios'
import { getToken } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import { useContext } from 'react'

export const ProfileEditableAvatar = () => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  const handleChange = (e: { target: HTMLInputElement | null }) => {
    const target = e.target
    const tokens = getToken()
    if (target === null || target.files === null) return
    const sizeInMegabytes = target.files[0].size / 1024 / 1024
    if (sizeInMegabytes > 2) {
      alert('2MB以下のファイルを選択してください。')
      return
    }
    const params = new FormData()
    params.append('avatar', target.files[0])
    axiosInstance
      .patch('/auth', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch((error) => {
        console.error(error.response.data)
      })
  }

  return (
    <>
      <input
        type="file"
        id="file"
        accept="image/jpeg,image/png"
        onChange={handleChange}
        hidden
      />
      <ButtonBase
        style={{
          display: 'block',
          borderRadius: '9999px',
          overflow: 'hidden'
        }}
      >
        <label htmlFor="file" className="avatar-wrapper relative h-48 w-48">
          <Avatar url={currentUser?.avatar_url} className="h-48 w-48" />
          <div className="absolute bottom-0 flex justify-center items-center  w-48 h-12 bg-neutral-900 opacity-0">
            <AddPhotoAlternateOutlined
              color="action"
              sx={{ fontSize: 40, color: 'white' }}
            />
          </div>
        </label>
      </ButtonBase>
    </>
  )
}
