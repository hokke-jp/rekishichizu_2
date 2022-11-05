import { SelectChangeEvent } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useFetchArticleOptionsContext } from 'Utils/FetchArticleOptionsContext'
import { useSearchQueriesContext } from 'Utils/SearchQueriesContext'
import { SortBy, SearchQueries } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'

const sortByAsc = (array: number[]): number[] => {
  return array.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

const stringIdsToNumberArray = (ids: string): number[] => {
  return ids.split(',').map((s) => Number(s))
}

const searchByIdsFromArray = (ids: string, array: string[]): string[] => {
  return stringIdsToNumberArray(ids).map((id) => array[id - 1])
}

const indexesOf = (value: string | string[], array: string[]): number[] => {
  return typeof value === 'string' ? [array.indexOf(value) + 1] : sortByAsc(value.map((val) => array.indexOf(val) + 1))
}

export const useSearch = () => {
  const { setArticles } = useArticlesContext()
  const { searchQueries, setSearchQueries } = useSearchQueriesContext()
  const { setFetchArticleOptions } = useFetchArticleOptionsContext()
  const periods: string[] =
    searchQueries.period_ids === '' ? [] : searchByIdsFromArray(searchQueries.period_ids, PERIODS)
  const prefectures: string[] =
    searchQueries.prefecture_ids === '' ? [] : searchByIdsFromArray(searchQueries.prefecture_ids, PREFECTURES)

  const handleSelect = (event: SelectChangeEvent<string | string[]>, optionsKey: string, array: string[]) => {
    const {
      target: { value }
    } = event
    const ids: number[] = indexesOf(value, array)
    setSearchQueries((prev) => ({ ...prev, [optionsKey]: `${ids}` }))
  }

  const handleChipDelete = (target: string, optionsKey: keyof SearchQueries, array: string[]) => {
    const targetIndex = array.indexOf(target) + 1
    setSearchQueries((prev) => ({
      ...prev,
      [optionsKey]: `${stringIdsToNumberArray(prev[optionsKey]).filter((index) => index !== targetIndex)}`
    }))
  }

  const handleSearch = () => {
    setFetchArticleOptions((prev) => ({ ...prev, isLoading: true, hasMore: true }))
    const removeSpace = (str: string): string => {
      return str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ',')
    }
    const removedWords = removeSpace(searchQueries.words)
    axiosInstance
      .get('/articles', {
        params: {
          page: 1,
          ...searchQueries,
          words: removedWords
        }
      })
      .then((response) => {
        setArticles(response.data)
      })
      .finally(() => {
        setFetchArticleOptions((prev) => ({ ...prev, isLoading: false }))
      })
  }

  const handleSort = (sortBy: SortBy) => {
    setFetchArticleOptions((prev) => ({ ...prev, isLoading: true, hasMore: true }))
    setSearchQueries((prev) => ({ ...prev, sort_by: sortBy }))
    axiosInstance
      .get('/articles', {
        params: {
          page: 1,
          words: searchQueries.words,
          period_ids: searchQueries.period_ids,
          prefecture_ids: searchQueries.prefecture_ids,
          sort_by: sortBy
        }
      })
      .then((response) => {
        setArticles(response.data)
      })
      .finally(() => {
        setFetchArticleOptions((prev) => ({ ...prev, isLoading: false }))
      })
  }

  return { periods, prefectures, handleSelect, handleChipDelete, handleSearch, handleSort }
}
