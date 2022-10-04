import { CardLayout } from './CardLayout'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Avatar } from 'Templates/Avatar'
import { Image } from 'Templates/Image'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { Article, User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens } from 'Utils/handleCookie'

const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical'
  }
})

interface Props {
  article: Article
  updateArticlesList: (updateArticleId: number, newLikedUserIds: number[]) => void
}

export const ArticleCard = ({ article, updateArticlesList }: Props) => {
  const classes = useStyles()
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
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
        updateArticlesList(article.id, data.new_liked_user_ids)
        setCurrentUser((prevState) => ({ ...prevState, liking_article_ids: data.new_liking_article_ids } as User))
        setAlertSeverity('success')
        setAlertMessage('イイね！')
      })
      .catch((error) => {
        console.error('エラー発生 : ', error)
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
        updateArticlesList(article.id, data.new_liked_user_ids)
        setCurrentUser((prevState) => ({ ...prevState, liking_article_ids: data.new_liking_article_ids } as User))
        setAlertSeverity('info')
        setAlertMessage('イイね！を外しました')
      })
      .catch((error) => {
        console.error('エラー発生 : ', error)
      })
  }
  const handleSuggest = () => {
    setAlertSeverity('warning')
    setAlertMessage('ログインしてください')
  }

  return (
    <CardLayout
      image={<Image url={article.image_url} className="w-full h-32" />}
      title={
        <Typography variant="h6" sx={{ height: 44, fontSize: 14 }} className={classes.multiLineEllipsis}>
          {article.title}
        </Typography>
      }
      avatar={<Avatar url={article.user.avatar_url} className="w-10 h-10 rounded-full" />}
      userName={
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }} noWrap>
          {article.user.name}
        </Typography>
      }
      createdAt={
        <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
          2.days.ago
        </Typography>
      }
      like={
        <>
          {currentUser ? (
            currentUser.liking_article_ids?.includes(article.id) ? (
              <IconButton aria-label="like" size="small" onClick={handleUnCheck}>
                <ThumbUpIcon color="primary" sx={{ fontSize: 18 }} />
              </IconButton>
            ) : (
              <IconButton aria-label="like" size="small" onClick={handleCheck}>
                <ThumbUpOutlinedIcon color="primary" sx={{ fontSize: 18 }} />
              </IconButton>
            )
          ) : (
            <IconButton aria-label="like" size="small" onClick={handleSuggest}>
              <ThumbUpOutlinedIcon color="primary" sx={{ fontSize: 18 }} />
            </IconButton>
          )}
          <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 16, pt: '2px' }}>
            {article.liked_user_ids.length}
          </Typography>
        </>
      }
    />
  )
}
