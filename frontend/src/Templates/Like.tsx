import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { IconButton, Typography } from '@mui/material'
import { useArticle } from 'Hooks/useArticle'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { Article, User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens, removeCookies } from 'Utils/handleCookie'

interface Props {
  article: Article
}
export const Like = ({ article }: Props) => {
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const { updateLikedUserIds } = useArticle()
  const handleCheck = () => {
    const tokens = getTokens()
    axiosInstance
      .post(
        '/likes',
        {
          article_id: article.id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...tokens
          }
        }
      )
      .then((response) => {
        const data = response.data
        updateLikedUserIds(article.id, data.new_liked_user_ids)
        setCurrentUser(
          (prevState: User | undefined) => ({ ...prevState, liking_article_ids: data.new_liking_article_ids } as User)
        )
        setAlertSeverity('success')
        setAlertMessage('イイね！')
      })
      .catch((error) => {
        console.error('エラー発生 : ', error)
        setCurrentUser(undefined)
        removeCookies()
        setAlertSeverity('warning')
        setAlertMessage(error.response.data.errors.join('\n'))
      })
  }
  const handleUnCheck = () => {
    const tokens = getTokens()
    axiosInstance
      .delete(`/likes/${article.id}`, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        const data = response.data
        updateLikedUserIds(article.id, data.new_liked_user_ids)
        setCurrentUser(
          (prevState: User | undefined) => ({ ...prevState, liking_article_ids: data.new_liking_article_ids } as User)
        )
        setAlertSeverity('info')
        setAlertMessage('イイね！を外しました')
      })
      .catch((error) => {
        console.error('エラー発生 : ', error)
        setCurrentUser(undefined)
        removeCookies()
        setAlertSeverity('warning')
        setAlertMessage(error.response.data.errors.join('\n'))
      })
  }
  const handleSuggest = () => {
    setAlertSeverity('warning')
    setAlertMessage('ログインしてください')
  }
  return (
    <>
      {currentUser ? (
        currentUser.liking_article_ids?.includes(article.id) ? (
          <IconButton size="small" onClick={handleUnCheck}>
            <ThumbUpIcon color="primary" sx={{ fontSize: 18 }} />
          </IconButton>
        ) : (
          <IconButton size="small" onClick={handleCheck}>
            <ThumbUpOutlinedIcon color="primary" sx={{ fontSize: 18 }} />
          </IconButton>
        )
      ) : (
        <IconButton size="small" onClick={handleSuggest}>
          <ThumbUpOutlinedIcon color="primary" sx={{ fontSize: 18 }} />
        </IconButton>
      )}
      <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 16, pt: '2px' }}>
        {article.liked_user_ids.length}
      </Typography>
    </>
  )
}
