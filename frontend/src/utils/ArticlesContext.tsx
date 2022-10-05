import { Article } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { createContext, ReactNode, useContext, useEffect, useState } from 'react'

const ArticlesContext = createContext(
  {} as {
    isLoading: boolean
    articles: Article[]
    updateArticlesList: (updateArticleId: number, newLikedUserIds: number[]) => void
  }
)

export const useArticlesContext = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  useEffect(() => {
    axiosInstance
      .get('/articles')
      .then((response) => {
        console.log(response)
        setIsLoading(false)
        setArticles(response.data)
      })
      .catch((error) => {
        console.error('レスポンスエラー : ', error)
      })
  }, [])

  const updateArticlesList = (updateArticleId: number, newLikedUserIds: number[]): void => {
    setArticles(
      articles.map((article: Article): Article => {
        return article.id === updateArticleId ? { ...article, liked_user_ids: newLikedUserIds } : article
      })
    )
  }

  const value = {
    isLoading,
    articles,
    updateArticlesList
  }

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}
