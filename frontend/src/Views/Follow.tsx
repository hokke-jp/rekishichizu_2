import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import { IconButton } from '@mui/material'
import { pink } from '@mui/material/colors'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens, removeCookies } from 'Utils/handleCookie'

interface Props {
  user: User
}

export const Follow = ({ user }: Props) => {
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  const handleFollow = () => {
    const tokens = getTokens()
    axiosInstance
      .post(
        '/relationships',
        {
          followed_id: user.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...tokens
          }
        }
      )
      .then((response) => {
        console.log(response)
        const data = response.data
        setCurrentUser(
          (prevState: User | undefined) => ({ ...prevState, following_ids: data.new_following_ids } as User)
        )
        setAlertSeverity('success')
        setAlertMessage('フォローしました')
      })
      .catch((error) => {
        console.error('エラー発生 : ', error)
        setCurrentUser(undefined)
        removeCookies()
        setAlertSeverity('warning')
        setAlertMessage(error.response.data.errors.join('\n'))
      })
  }
  const handleUnFollow = () => {
    const tokens = getTokens()
    axiosInstance
      .delete(`/relationships/${user.id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        console.log(response)
        const data = response.data
        setCurrentUser(
          (prevState: User | undefined) => ({ ...prevState, following_ids: data.new_following_ids } as User)
        )
        setAlertSeverity('info')
        setAlertMessage('フォローを外しました')
      })
      .catch((error) => {
        console.error('エラー発生 : ', error)
        setCurrentUser(undefined)
        removeCookies()
        setAlertSeverity('warning')
        setAlertMessage(error.response.data.errors.join('\n'))
      })
  }

  return currentUser ? (
    <div className="fixed top-2 right-3">
      {currentUser.following_ids?.includes(user.id) ? (
        <IconButton onClick={handleUnFollow}>
          <FavoriteIcon sx={{ color: pink[500] }} fontSize="large" />
        </IconButton>
      ) : (
        <IconButton onClick={handleFollow}>
          <FavoriteBorderIcon sx={{ color: pink[500] }} fontSize="large" />
        </IconButton>
      )}
    </div>
  ) : null
}
