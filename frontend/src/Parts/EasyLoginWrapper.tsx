import { Tooltip, ButtonBase } from '@mui/material'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { setCookie } from 'Utils/handleCookie'
import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

export const EasyLoginWrapper = ({ children }: { children: ReactNode }) => {
  const { setCurrentUser } = useCurrentUserContext()
  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const navigate = useNavigate()
  const handleClick = () => {
    axiosInstance
      .post('/auth/sign_in', {
        email: 'sample@mail.com',
        password: 'password'
      })
      .then((response) => {
        const headers = response.headers
        setCookie([headers.uid, headers.client, headers['access-token']])
        setCurrentUser(response.data.data)
        navigate(`/${response.data.data.name}`)
        setAlertSeverity('info')
        setAlertMessage('ログインしました')
      })
      .catch((error) => {
        console.error(error)
      })
  }
  return (
    <Tooltip title="簡単ログイン" placement="right">
      <div className="hover:bg-gray-100" onClick={handleClick}>
        <ButtonBase style={{ display: 'block', width: '100%' }}>
          <div className="flex items-center justify-center h-16 w-full">{children}</div>
        </ButtonBase>
      </div>
    </Tooltip>
  )
}
