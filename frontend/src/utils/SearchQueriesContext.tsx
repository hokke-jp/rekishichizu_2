import { SearchQueries } from 'Utils/Types'
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

const SearchQueriesContext = createContext(
  {} as {
    searchQueries: SearchQueries
    setSearchQueries: Dispatch<SetStateAction<SearchQueries>>
  }
)

export const useSearchQueriesContext = () => {
  return useContext(SearchQueriesContext)
}

interface State {
  state: {
    searchQueriesKey: 'period_ids' | 'prefecture_ids'
    searchQueriesValue: number
  } | null
}

export const SearchQueriesContextProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation()
  const { state } = location as State
  const tagPeriod: string = state
    ? state.searchQueriesKey === 'period_ids'
      ? state.searchQueriesValue.toString()
      : ''
    : ''
  const tagPrefecture: string = state
    ? state.searchQueriesKey === 'prefecture_ids'
      ? state.searchQueriesValue.toString()
      : ''
    : ''
  const [searchQueries, setSearchQueries] = useState<SearchQueries>({
    words: '',
    period_ids: tagPeriod,
    prefecture_ids: tagPrefecture,
    sort_by: 'created_at DESC'
  })

  return (
    <SearchQueriesContext.Provider value={{ searchQueries, setSearchQueries }}>
      {children}
    </SearchQueriesContext.Provider>
  )
}
