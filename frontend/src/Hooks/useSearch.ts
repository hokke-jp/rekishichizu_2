import { SelectChangeEvent } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { SortBy, Options } from 'Utils/Types'
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
  const { options, setIsLoading, setArticles, setOptions, setHasMore } = useArticlesContext()
  const periods: string[] = options.period_ids === '' ? [] : searchByIdsFromArray(options.period_ids, PERIODS)
  const prefectures: string[] =
    options.prefecture_ids === '' ? [] : searchByIdsFromArray(options.prefecture_ids, PREFECTURES)

  const handleSelect = (event: SelectChangeEvent<string | string[]>, optionsKey: string, array: string[]) => {
    const {
      target: { value }
    } = event
    const ids: number[] = indexesOf(value, array)
    setOptions((prev) => ({ ...prev, [optionsKey]: `${ids}` }))
  }

  const handleChipDelete = (target: string, optionsKey: keyof Options, array: string[]) => {
    const targetIndex = array.indexOf(target) + 1
    setOptions((prev) => ({
      ...prev,
      [optionsKey]: `${stringIdsToNumberArray(prev[optionsKey]).filter((index) => index !== targetIndex)}`
    }))
  }

  const handleSearch = () => {
    setIsLoading(true)
    setHasMore(true)
    const removeSpace = (str: string): string => {
      return str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ',')
    }
    const removedWords = removeSpace(options.words)
    axiosInstance
      .get('/articles', {
        params: {
          page: 1,
          ...options,
          words: removedWords
        }
      })
      .then((response) => {
        setArticles(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleSort = (sortBy: SortBy) => {
    setIsLoading(true)
    setHasMore(true)
    setOptions((prev) => ({ ...prev, sort_by: sortBy }))
    axiosInstance
      .get('/articles', {
        params: {
          page: 1,
          words: options.words,
          period_ids: options.period_ids,
          prefecture_ids: options.prefecture_ids,
          sort_by: sortBy
        }
      })
      .then((response) => {
        setArticles(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return { periods, prefectures, handleSelect, handleChipDelete, handleSearch, handleSort }
}
