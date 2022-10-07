import { ArticleMenu } from './ArticleMenu'
import { Modal, Skeleton, Typography } from '@mui/material'
import { AvatarLink } from 'Parts/AvatarLink'
import { Image } from 'Templates/Image'
import { Like } from 'Templates/Like'
import { Article } from 'Utils/Types'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  article: Article
  open: boolean
  handleClose: () => void
}

export const ArticleModal = ({ article, open, handleClose }: Props) => {
  const date = new Date(article.created_time)

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex min-w-[80%] w-4/5 min-h-[80%] h-4/5 bg-white outline-none rounded-xl overflow-hidden">
        <ArticleMenu article={article} />
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper min-w-[40%] w-2/5 h-full bg-gray-200">
          <SwiperSlide>
            <Image url={article.image_url} className="w-full h-full" />
          </SwiperSlide>
          <SwiperSlide>
            <Image url={article.image_url} className="w-full h-full !object-contain" />
          </SwiperSlide>
        </Swiper>
        <div className="grow pt-5 px-8 pb-10 overflow-scroll">
          <div className="flex items-center gap-5">
            <AvatarLink
              path={article.user.name}
              avatarUrl={article.user.avatar_url}
              className="w-14 h-14 rounded-full"
            />
            <div className="grow">
              <Typography variant="h5" sx={{ fontSize: 22 }} noWrap>
                {article.user.name}
              </Typography>
            </div>
          </div>
          <hr className="w-0 h-6" />
          <div>
            <Typography variant="h5">{article.title}</Typography>
          </div>
          <hr className="w-0 h-5" />
          <div className="flex gap-x-2">
            <Skeleton variant="rectangular" width={60} height={30} />
            <Skeleton variant="rectangular" width={60} height={30} />
          </div>
          <hr className="w-0 h-2" />
          <div className="flex items-end justify-between">
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13 }}>
              投稿日時 : {date.toLocaleDateString('ja-JP').toString()} {date.toLocaleTimeString('ja-JP').toString()}
            </Typography>
            <div className="flex items-center">
              <Like article={article} />
            </div>
          </div>
          <hr className="mb-10" />
          <div>
            <Typography component={'span'} variant="body2">
              {article.content?.split('\n').map((i, key) => {
                return (
                  <p className="min-h-[21px]" key={key}>
                    {i}
                  </p>
                )
              })}
            </Typography>
          </div>
        </div>
      </div>
    </Modal>
  )
}
