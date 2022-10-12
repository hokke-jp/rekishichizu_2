import { Modal, Typography } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { AvatarLink } from 'Parts/AvatarLink'
import { Image } from 'Templates/Image'
import { Like } from 'Templates/Like'
import { ArticleMenu } from 'Templates/Modal/ArticleMenu'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { Article } from 'Utils/Types'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  article: Article
  index: number
}

export const ArticleModal = ({ article, index }: Props) => {
  const { modalOpens, handleClose } = useArticlesContext()
  const date = new Date(article.created_time)

  return (
    <Modal
      open={modalOpens[index]}
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
              path={`/${article.user.name}`}
              avatarUrl={article.user.avatar_url}
              className="w-14 h-14 rounded-full"
            />
            <div className="grow">
              <Typography variant="h5" sx={{ fontSize: 22 }} noWrap>
                {article.user.name}
              </Typography>
            </div>
          </div>
          <hr className="w-0 h-7" />
          <div>
            <Typography variant="h5">{article.title}</Typography>
          </div>
          <hr className="w-0 h-7" />
          <div className="flex items-end gap-x-10">
            <div className="">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: 12 }}>
                時代
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                {PERIODS[article.period_id - 1]}
              </Typography>
            </div>
            <div className="">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: 12 }}>
                都道府県
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                {PREFECTURES[article.prefecture_id - 1]}
              </Typography>
            </div>
            <div className="flex flex-col gap-y-1">
              <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 12 }}>
                投稿日
              </Typography>
              <Typography variant="body2" sx={{ fontSize: 16 }}>
                {`${date.toLocaleDateString('ja-JP')}`}
                {/* {`${date.toLocaleDateString('ja-JP')}`} {`${date.toLocaleTimeString('ja-JP')}`} */}
              </Typography>
            </div>
            <div className="flex items-center ml-auto">
              <Like article={article} />
            </div>
          </div>
          <hr className="mb-10" />
          <div>
            <Typography component={'span'} variant="body2">
              {article.content?.split('\n').map((text, index) => {
                return (
                  <p className="min-h-[21px]" key={index}>
                    {text}
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
