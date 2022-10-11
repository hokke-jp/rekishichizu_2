import { ButtonBase } from '@mui/material'
import { useArticle } from 'Hooks/useArticle'
import { ArticleCard } from 'Templates/Card/ArticleCard'
import { SkeletonCard } from 'Templates/Card/SkeletonCard'
import { UserListElement } from 'Templates/UserListElement'
import { UserListSkeletonElement } from 'Templates/UserListSkeletonElement'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

interface Props {
  articleIds: number[] | undefined
  likingArticleIds: number[] | undefined
  followingIds: number[] | undefined
}

export const Status = ({ articleIds, likingArticleIds, followingIds }: Props) => {
  const { duringFetchData, setDuringFetchData, nowLoading, skeletonNumber, users, fetchArticles, fetchUsers } =
    useArticle()
  const { articles, setArticles } = useArticlesContext()
  const ref = useRef<null | HTMLDivElement>(null)

  // 現在のページから他のユーザーのページへ移った際に articles が更新されずに残り続けるバグの対策
  const locatio = useLocation()
  useEffect(() => {
    setArticles([])
    setDuringFetchData(null)
  }, [locatio.pathname, setArticles, setDuringFetchData])

  return (
    <div className="max-w-5xl w-full">
      <dl className="grid grid-cols-1 gap-16 sm:grid-cols-3 max-w-4xl mx-auto">
        <ButtonBase
          style={{ display: 'block' }}
          onClick={() => {
            fetchArticles(articleIds, ref)
          }}
        >
          <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
            <dt className="order-last text-lg font-medium text-gray-500">投稿数</dt>
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{articleIds?.length || 0}</dd>
          </div>
        </ButtonBase>

        <ButtonBase
          style={{ display: 'block' }}
          onClick={() => {
            fetchArticles(likingArticleIds, ref)
          }}
        >
          <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
            <dt className="order-last text-lg font-medium text-gray-500">「イイね」した記事</dt>
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{likingArticleIds?.length || 0}</dd>
          </div>
        </ButtonBase>

        <ButtonBase
          style={{ display: 'block' }}
          onClick={() => {
            fetchUsers(followingIds, ref)
          }}
        >
          <div className="flex flex-col px-4 py-8 bg-gray-100 text-center rounded-lg hover:opacity-80">
            <dt className="order-last text-lg font-medium text-gray-500">フォロー中</dt>
            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">{followingIds?.length || 0}</dd>
          </div>
        </ButtonBase>
      </dl>
      <div ref={ref} className={duringFetchData ? 'mt-32 mb-32 border-t' : ''}></div>

      {duringFetchData === 'article' ? (
        <ul className="grid gap-8 grid-cols-4 justify-center items-center w-fit mx-auto pb-32">
          {nowLoading
            ? [...Array(skeletonNumber)].map((v, i) => (
                <li key={i}>
                  <SkeletonCard />
                </li>
              ))
            : articles.map((article, i) => (
                <li key={i}>
                  <ArticleCard article={article} index={i} />
                </li>
              ))}
        </ul>
      ) : duringFetchData === 'user' ? (
        <ul className="flex flex-col w-72 mx-auto mb-32 border border-gray-300 rounded-md">
          {nowLoading
            ? [...Array(skeletonNumber)].map((v, i) => (
                <li className="border-b last:border-b-0" key={i}>
                  <UserListSkeletonElement />
                </li>
              ))
            : users.map((user, i) => (
                <li className="border-b last:border-b-0" key={i}>
                  <UserListElement user={user} />
                </li>
              ))}
        </ul>
      ) : null}
    </div>
  )
}
