import { Article, Options } from 'Utils/Types'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

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

interface State {
  state: {
    optionsKey: 'period_ids' | 'prefecture_ids'
    optionsValue: number
  } | null
}

export const ArticlesProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const { state } = location as State
  const [isLoading, setIsLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])
  const [openModalId, setOpenModalId] = useState<number | undefined>(undefined)
  const tagPeriod: string = state ? (state.optionsKey === 'period_ids' ? state.optionsValue.toString() : '') : ''
  const tagPrefecture: string = state
    ? state.optionsKey === 'prefecture_ids'
      ? state.optionsValue.toString()
      : ''
    : ''
  const [options, setOptions] = useState<Options>({
    words: '',
    period_ids: tagPeriod,
    prefecture_ids: tagPrefecture,
    sort_by: 'created_at DESC'
  })
  const [hasMore, setHasMore] = useState(true)

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
