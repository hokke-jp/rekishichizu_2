import { useStatus } from 'Hooks/useStatus'
import { ArticleCard } from 'Templates/Card/ArticleCard'
import { SkeletonCard } from 'Templates/Card/SkeletonCard'
import { Status } from 'Templates/Profile/Status'
import { UserListElement } from 'Templates/UserListElement'
import { UserListSkeletonElement } from 'Templates/UserListSkeletonElement'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { MutableRefObject, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

type Ids = number[] | undefined
type Element = MutableRefObject<HTMLDivElement | null>
type Status = [text: string, ids: Ids, element: Element, onClick: (ids: Ids, element: Element) => void]
interface Props {
  articleIds: Ids
  likingArticleIds: Ids
  followingIds: Ids
}

export const UserStatuses = ({ articleIds, likingArticleIds, followingIds }: Props) => {
  const { duringFetchData, setDuringFetchData, nowLoading, skeletonNumber, users, fetchArticles, fetchUsers } =
    useStatus()
  const { articles, setArticles } = useArticlesContext()
  const ref = useRef<null | HTMLDivElement>(null)
  const statuses: Status[] = [
    ['投稿数', articleIds, ref, fetchArticles],
    ['「イイね」した記事', likingArticleIds, ref, fetchArticles],
    ['フォロー中', followingIds, ref, fetchUsers]
  ]

  // 任意のプロフィールページから他のユーザーのページへ移った際に articles が更新されずに残り続けるバグの対策
  const locatio = useLocation()
  useEffect(() => {
    setArticles([])
    setDuringFetchData(null)
  }, [locatio.pathname, setArticles, setDuringFetchData])

  return (
    <div className="max-w-5xl w-full">
      <dl className="grid grid-cols-1 gap-16 sm:grid-cols-3 max-w-4xl mx-auto">
        {statuses.map((status) => (
          <Status key={status[0]} text={status[0]} ids={status[1]} element={status[2]} onClick={status[3]} />
        ))}
      </dl>
      <div ref={ref} className={duringFetchData ? 'mt-32 mb-32 border-t' : ''}></div>

      {duringFetchData === 'article' ? (
        <ul className="grid gap-x-8 gap-y-24 grid-cols-4 justify-center items-center w-fit mx-auto pb-32">
          {nowLoading
            ? [...Array(skeletonNumber)].map((v, i) => (
                <li key={i}>
                  <SkeletonCard />
                </li>
              ))
            : articles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
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
