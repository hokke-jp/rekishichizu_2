import { Status } from 'Templates/Profile/Status'
import { ArticlesProvider } from 'Utils/ArticlesContext'
import { ReactNode } from 'react'

interface Props {
  avatar: ReactNode
  name: ReactNode
  introduction: ReactNode
  articleIds: number[] | undefined
  likingArticleIds: number[] | undefined
  followingIds: number[] | undefined
}

export const Layout = ({ avatar, name, introduction, articleIds, likingArticleIds, followingIds }: Props) => {
  return (
    <section className="flex flex-col items-center py-20 px-20">
      {avatar}
      <hr className="h-14" />
      {name}
      <hr className="h-14" />
      <div className="w-1/2 text-center">{introduction}</div>
      <hr className="h-24" />
      <ArticlesProvider>
        <Status articleIds={articleIds} likingArticleIds={likingArticleIds} followingIds={followingIds} />{' '}
      </ArticlesProvider>
    </section>
  )
}
