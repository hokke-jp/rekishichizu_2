import { Article } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

interface Options {
  words: string
  period_ids: string
  prefecture_ids: string
  sort_by: string
}

const ArticlesContext = createContext(
  {} as {
    isLoading: boolean
    articles: Article[]
    openModalId: number | undefined
    options: Options
    hasMore: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setArticles: Dispatch<SetStateAction<Article[]>>
    setOpenModalId: Dispatch<SetStateAction<number | undefined>>
    setOptions: Dispatch<SetStateAction<Options>>
    setHasMore: Dispatch<SetStateAction<boolean>>
  }
)

export const useArticlesContext = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [openModalId, setOpenModalId] = useState<number | undefined>(undefined)
  const [options, setOptions] = useState<Options>({
    words: '',
    period_ids: '',
    prefecture_ids: '',
    sort_by: 'created_at DESC'
  })
  const [hasMore, setHasMore] = useState(true)
  const location = useLocation()

  useEffect(() => {
    // ホームページのみレンダリング時に articles を fetch する
    if (location.pathname !== '/') return
    axiosInstance
      .get('/articles', {
        params: {
          page: 1
        }
      })
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
    openModalId,
    options,
    hasMore,
    setIsLoading,
    setArticles,
    setOpenModalId,
    setOptions,
    setHasMore
  }

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}
