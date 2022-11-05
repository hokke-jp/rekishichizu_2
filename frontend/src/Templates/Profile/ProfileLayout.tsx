import { ArticlesProvider } from 'Utils/ArticlesContext'
import { FetchArticleOptionsProvider } from 'Utils/FetchArticleOptionsContext'
import { SearchQueriesContextProvider } from 'Utils/SearchQueriesContext'
import { User } from 'Utils/Types'
import { UserStatuses } from 'Views/UserStatuses'
import { ReactNode } from 'react'

interface Props {
  user: User
  avatar: ReactNode
  name: ReactNode
  introduction: ReactNode
}

export const ProfileLayout = ({ user, avatar, name, introduction }: Props) => {
  const articleIds = user.article_ids
  const likingArticleIds = user.liking_article_ids
  const followingIds = user.following_ids

  return (
    <section className="flex flex-col items-center py-20 px-20">
      {avatar}
      <hr className="h-14" />
      {name}
      <hr className="h-14" />
      <div className="w-1/2 text-center">{introduction}</div>
      <hr className="h-24" />
      <ArticlesProvider>
        <FetchArticleOptionsProvider>
          <SearchQueriesContextProvider>
            <UserStatuses articleIds={articleIds} likingArticleIds={likingArticleIds} followingIds={followingIds} />{' '}
          </SearchQueriesContextProvider>
        </FetchArticleOptionsProvider>
      </ArticlesProvider>
    </section>
  )
}
