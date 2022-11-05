import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { ARTICLE_CLICK_ZOOM } from 'Constant/MAP'
import { AvatarLink } from 'Parts/AvatarLink'
import { CreatedAgo } from 'Parts/CreatedAgo'
import { CardLayout } from 'Templates/Card/CardLayout'
import { Image } from 'Templates/Image'
import { Like } from 'Templates/Like'
import { ArticleModal } from 'Templates/Modal/ArticleModal'
import { useFetchArticleOptionsContext } from 'Utils/FetchArticleOptionsContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { Article } from 'Utils/Types'

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
  const { googleMap } = useGoogleMapsContext()
  const { setFetchArticleOptions } = useFetchArticleOptionsContext()
  const classes = useStyles()
  const attentionToPin = () => {
    googleMap?.panTo({ lat: article.lat, lng: article.lng })
    googleMap?.setZoom(ARTICLE_CLICK_ZOOM)
  }
  const modalOpen = () => {
    setFetchArticleOptions((prev) => ({ ...prev, openModalId: article.id }))
  }

  return (
    <>
      <CardLayout
        image={<Image url={article.image_url} className="w-full h-32" />}
        title={
          <Typography
            variant="h5"
            sx={{ height: 44, fontSize: 15, lineHeight: '21px' }}
            className={classes.multiLineEllipsis}
          >
            {article.title}
          </Typography>
        }
        avatar={
          <AvatarLink
            path={`/${article.user.name}`}
            avatarUrl={article.user.avatar_url}
            className="w-10 h-10 mb-2 rounded-full"
          />
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
        onDoubleClick={modalOpen}
        onClick={attentionToPin}
      />
      <ArticleModal article={article} />
    </>
  )
}
