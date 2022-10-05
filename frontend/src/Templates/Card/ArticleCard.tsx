import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { AvatarLink } from 'Parts/AvatarLink'
import { CreatedAgo } from 'Parts/CreatedAgo'
import { CardLayout } from 'Templates/Card/CardLayout'
import { Image } from 'Templates/Image'
import { Like } from 'Templates/Like'
import { ArticleModal } from 'Templates/Modal/ArticleModal'
import { Article } from 'Utils/Types'
import { useState } from 'react'

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
}

export const ArticleCard = ({ article }: Props) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <li onDoubleClick={handleOpen}>
      <CardLayout
        image={<Image url={article.image_url} className="w-full h-32" />}
        title={
          <Typography variant="h6" sx={{ height: 44, fontSize: 14 }} className={classes.multiLineEllipsis}>
            {article.title}
          </Typography>
        }
        avatar={
          <AvatarLink path={article.user.name} avatarUrl={article.user.avatar_url} className="w-10 h-10 rounded-full" />
        }
        userName={
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }} noWrap>
            {article.user.name}
          </Typography>
        }
        createdTime={
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
            <CreatedAgo createdTime={Number(article.created_time)} />
          </Typography>
        }
        like={<Like article={article} />}
      />
      <ArticleModal article={article} open={open} handleClose={handleClose} />
    </li>
  )
}
