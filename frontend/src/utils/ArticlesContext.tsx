import { Article } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ArticlesContext = createContext(
  {} as {
    isLoading: boolean
    articles: Article[]
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setArticles: Dispatch<SetStateAction<Article[]>>
  }
)

export const useArticlesContext = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const location = useLocation()
  useEffect(() => {
    // ホームページのみレンダリング時に articles を fetch する
    if (location.pathname !== '/') return
    axiosInstance
      .get('/articles')
      .then((response) => {
        setIsLoading(false)
        setArticles(response.data)
      })
      .catch((error) => {
        console.error('レスポンスエラー : ', error)
      })
  }, [location.pathname])

  const value = {
    isLoading,
    articles,
    setIsLoading,
    setArticles
  }

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}
