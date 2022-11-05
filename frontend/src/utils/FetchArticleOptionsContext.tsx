import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

interface FetchArticleOptions {
  isLoading: boolean
  openModalId: number | undefined
  hasMore: boolean
}

const FetchArticleOptionsContext = createContext(
  {} as {
    fetchArticleOptions: FetchArticleOptions
    setFetchArticleOptions: Dispatch<SetStateAction<FetchArticleOptions>>
  }
)

export const useFetchArticleOptionsContext = () => {
  return useContext(FetchArticleOptionsContext)
}

export const FetchArticleOptionsProvider = ({ children }: { children: ReactNode }) => {
  const [fetchArticleOptions, setFetchArticleOptions] = useState<FetchArticleOptions>({
    isLoading: true,
    openModalId: undefined,
    hasMore: true
  })

  return (
    <FetchArticleOptionsContext.Provider value={{ fetchArticleOptions, setFetchArticleOptions }}>
      {children}
    </FetchArticleOptionsContext.Provider>
  )
}
