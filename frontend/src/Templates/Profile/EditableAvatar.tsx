import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import { ButtonBase } from '@mui/material'
import { Avatar } from 'Templates/Avatar'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { getToken } from 'Utils/handleCookie'

export const EditableAvatar = () => {
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const handleChange = (e: { target: HTMLInputElement | null }) => {
    const target = e.target
    const tokens = getToken()
    if (target === null || target.files === null) return
    const sizeInMegabytes = target.files[0].size / 1024 / 1024
    if (sizeInMegabytes > 2) {
      setAlertMessage('2MB以下のファイルを選択してください。')
      setAlertSeverity('error')
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
        setAlertMessage(error.response.data.errors.full_messages)
        setAlertSeverity('error')
        console.error(error.response.data)
      })
  }

  return (
    <>
      <input type="file" id="file" accept="image/jpeg,image/png" onChange={handleChange} hidden />
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
            <AddPhotoAlternateOutlined color="action" sx={{ fontSize: 40, color: 'white' }} />
          </div>
        </label>
      </ButtonBase>
    </>
  )
}
