import { CardLayout } from './CardLayout'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { IconButton, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Avatar } from 'Templates/Avatar'
import { Image } from 'Templates/Image'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { Article } from 'Utils/Types'

const LINES_TO_SHOW = 2
const useStyles = makeStyles({
  multiLineEllipsis: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': LINES_TO_SHOW,
    '-webkit-box-orient': 'vertical'
  }
})

interface Props {
  article: Article
}

export const ArticleCard = ({ article }: Props) => {
  const classes = useStyles()
  const { currentUser } = useCurrentUserContext()
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
            <IconButton aria-label="like" size="small">
              <ThumbUpIcon color="primary" sx={{ fontSize: 18 }} />
            </IconButton>
          ) : (
            <IconButton aria-label="like" size="small" disabled>
              <ThumbUpOutlinedIcon color="primary" sx={{ fontSize: 18 }} />
            </IconButton>
          )}
          <Typography variant="body2" sx={{ color: 'primary.main', fontSize: 16, pt: '2px' }}>
            3
          </Typography>
        </>
      }
    />
  )
}
