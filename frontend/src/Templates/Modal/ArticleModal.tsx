import { Modal, Typography } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { AvatarLink } from 'Parts/AvatarLink'
import { Image } from 'Templates/Image'
import { Like } from 'Templates/Like'
import { ArticleMenu } from 'Templates/Modal/ArticleMenu'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useFetchArticleOptionsContext } from 'Utils/FetchArticleOptionsContext'
import { useSearchQueriesContext } from 'Utils/SearchQueriesContext'
import { Article, SearchQueries } from 'Utils/Types'
import { useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { Swiper, SwiperSlide } from 'swiper/react'

interface Props {
  article: Article
}

export const ArticleModal = ({ article }: Props) => {
  const { setArticles } = useArticlesContext()
  const { fetchArticleOptions, setFetchArticleOptions } = useFetchArticleOptionsContext()
  const { setSearchQueries } = useSearchQueriesContext()
  const navigate = useNavigate()
  const date = new Date(article.created_time)

  const modalClose = () => {
    setFetchArticleOptions((prev) => ({ ...prev, openModalId: undefined }))
  }

  const handleClick = (searchQueriesKey: keyof SearchQueries, searchQueriesValue: number) => {
    setArticles([])
    setFetchArticleOptions({ isLoading: true, openModalId: undefined, hasMore: true })
    const newOptions: SearchQueries =
      searchQueriesKey === 'period_ids'
        ? {
            words: '',
            period_ids: searchQueriesValue.toString(),
            prefecture_ids: '',
            sort_by: 'created_at DESC'
          }
        : {
            words: '',
            period_ids: '',
            prefecture_ids: searchQueriesValue.toString(),
            sort_by: 'created_at DESC'
          }
    setSearchQueries({ ...newOptions })
    navigate('/', { state: { searchQueriesKey, searchQueriesValue } })
  }

  return (
    <Modal
      open={fetchArticleOptions.openModalId === article.id}
      onClose={modalClose}
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
              className="w-14 h-14 rounded-full"
              avatarUrl={article.user.avatar_url}
              resetOpenModal={modalClose}
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
                <button onClick={() => handleClick('period_ids', article.period_id)}>
                  {PERIODS[article.period_id - 1]}
                </button>
              </Typography>
            </div>
            <div className="">
              <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: 12 }}>
                都道府県
              </Typography>
              <Typography variant="subtitle2" sx={{ fontSize: 16 }}>
                <button onClick={() => handleClick('prefecture_ids', article.prefecture_id)}>
                  {PREFECTURES[article.prefecture_id - 1]}
                </button>
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
              {article.content.split('\n').map((text, index) => {
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
