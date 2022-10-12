import { Article } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const ArticlesContext = createContext(
  {} as {
    isLoading: boolean
    articles: Article[]
    modalOpens: boolean[]
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setArticles: Dispatch<SetStateAction<Article[]>>
    setModalOpens: Dispatch<SetStateAction<boolean[]>>
    handleOpen: (index: number | undefined) => void
    handleClose: () => void
  }
)

export const useArticlesContext = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  console.log('更新プロバイダー')
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [modalOpens, setModalOpens] = useState<boolean[]>([])
  const location = useLocation()
  useEffect(() => {
    // ホームページのみレンダリング時に articles を fetch する
    if (location.pathname !== '/') return
    axiosInstance
      .get('/articles')
      .then((response) => {
        setIsLoading(false)
        const articles = response.data
        setArticles(articles)
        const nums = articles.length
        setModalOpens([...Array(nums)].map(() => false))
      })
      .catch((error) => {
        console.error('レスポンスエラー : ', error)
      })
  }, [location.pathname])

  const handleOpen = (index: number | undefined) => {
    typeof index === 'number' && setModalOpens(modalOpens.map((open, i) => (i === index ? true : open)))
  }
  const handleClose = () => {
    setModalOpens([...Array(articles.length)].map(() => false))
  }

  const value = {
    isLoading,
    articles,
    modalOpens,
    setIsLoading,
    setArticles,
    setModalOpens,
    handleOpen,
    handleClose
  }

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}
