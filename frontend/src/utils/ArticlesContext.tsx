import { Article } from 'Utils/Types'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

const ArticlesContext = createContext(
  {} as {
    articles: Article[]
    setArticles: Dispatch<SetStateAction<Article[]>>
  }
)

export const useArticlesContext = () => {
  return useContext(ArticlesContext)
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const [articles, setArticles] = useState<Article[]>([])

  const value = {
    articles,
    setArticles
  }

  return <ArticlesContext.Provider value={value}>{children}</ArticlesContext.Provider>
}
