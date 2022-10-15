// import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded'
import SearchIcon from '@mui/icons-material/Search'
import {
  Box,
  Button,
  ButtonBase,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent
} from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { Options, SortBy } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { ChangeEvent, useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const sortByAsc = (ary: number[]): number[] => {
  return ary.sort((a, b) => {
    if (a < b) return -1
    if (a > b) return 1
    return 0
  })
}

const convertArrayIndex = (str: string) => {
  return str.split(',').map((s) => Number(s))
}

const valuesConvertIndexes = (value: string | string[], array: string[]) => {
  return typeof value === 'string' ? [array.indexOf(value) + 1] : sortByAsc(value.map((val) => array.indexOf(val) + 1))
}

export const SearchDrawer = () => {
  const { options, setIsLoading, setArticles, setOptions, setHasMore } = useArticlesContext()
  const [words, setWords] = useState('')
  const periods: string[] =
    options.period_ids === ''
      ? []
      : options.period_ids
          .split(',')
          .map((elem) => Number(elem))
          .map((id) => PERIODS[id - 1])
  const prefectures: string[] =
    options.prefecture_ids === ''
      ? []
      : options.prefecture_ids
          .split(',')
          .map((elem) => Number(elem))
          .map((id) => PREFECTURES[id - 1])

  const handleWord = (event: ChangeEvent<HTMLInputElement>) => {
    const word = event.target.value
    setWords(word)
    const removeSpace = (str: string): string => {
      return str.replace(/^\s+|\s+$/g, '').replace(/\s+/g, ',')
    }
    const removedWords = removeSpace(word)
    setOptions((prev) => ({ ...prev, words: removedWords }))
  }
  const handleSelect = (event: SelectChangeEvent<string | string[]>, optionsKey: string, array: string[]) => {
    const {
      target: { value }
    } = event
    const ids: number[] = valuesConvertIndexes(value, array)
    setOptions((prev) => ({ ...prev, [optionsKey]: `${ids}` }))
  }
  const handleChipDelete = (target: string, optionsKey: keyof Options, array: string[]) => {
    const targetIndex = array.indexOf(target) + 1
    setOptions((prev) => ({
      ...prev,
      [optionsKey]: `${convertArrayIndex(prev[optionsKey]).filter((index) => index !== targetIndex)}`
    }))
  }

  const handleSearch = () => {
    setIsLoading(true)
    setHasMore(true)
    axiosInstance
      .get('/articles', {
        params: {
          page: 1,
          ...options
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
        console.log(response.data)
        setArticles(response.data)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <input type="checkbox" id="search-drawer-checkbox" hidden />
      <div
        id="search-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-lg overflow-hidden"
      >
        <div className="grow flex flex-col gap-y-10 min-h-screen py-10 pr-2 pl-8 overflow-scroll">
          <div className="grid grid-rows-2 grid-cols-2 min-h-[96px] border border-[#B7B7B7] rounded-2xl overflow-hidden">
            <ButtonBase onClick={() => handleSort('created_at DESC')}>
              <input
                type="radio"
                id="latest"
                name="drone"
                value="latest"
                className="peer"
                hidden
                onChange={() => setOptions((prev) => ({ ...prev, sort_by: 'created_at DESC' }))}
                checked={options.sort_by === 'created_at DESC'}
              />
              <label
                htmlFor="latest"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] border-r border-b hover:cursor-pointer"
              >
                <p>最新</p>
              </label>
            </ButtonBase>
            <ButtonBase onClick={() => handleSort('likes_count DESC')}>
              <input
                type="radio"
                id="popular"
                name="drone"
                value="popular"
                className="peer"
                hidden
                onChange={() => setOptions((prev) => ({ ...prev, sort_by: 'likes_count DESC' }))}
                checked={options.sort_by === 'likes_count DESC'}
              />
              <label
                htmlFor="popular"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] border-b hover:cursor-pointer"
              >
                <p>人気</p>
              </label>
            </ButtonBase>
            <ButtonBase onClick={() => handleSort('period_id DESC')}>
              <input
                type="radio"
                id="old"
                name="drone"
                value="old"
                className="peer"
                hidden
                onChange={() => setOptions((prev) => ({ ...prev, sort_by: 'period_id DESC' }))}
                checked={options.sort_by === 'period_id DESC'}
              />
              <label
                htmlFor="old"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] border-r hover:cursor-pointer"
              >
                <p>古い</p>
              </label>
            </ButtonBase>
            <ButtonBase onClick={() => handleSort('period_id ASC')}>
              <input
                type="radio"
                id="new"
                name="drone"
                value="new"
                className="peer"
                hidden
                onChange={() => setOptions((prev) => ({ ...prev, sort_by: 'period_id ASC' }))}
                checked={options.sort_by === 'period_id ASC'}
              />
              <label
                htmlFor="new"
                className="flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] hover:cursor-pointer"
              >
                <p>新しい</p>
              </label>
            </ButtonBase>
          </div>

          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-search">キーワード検索</InputLabel>
            <OutlinedInput
              id="outlined-adornment-search"
              type="text"
              value={words}
              onChange={handleWord}
              sx={{ borderRadius: '30px' }}
              endAdornment={
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              }
              onKeyDown={(e) => {
                if (e.keyCode === 13) handleSearch()
              }}
              label="キーワード検索"
            />
          </FormControl>

          <FormControl>
            <InputLabel id="period-multiple-chip-label">時代</InputLabel>
            <Select
              labelId="period-multiple-chip-label"
              id="period-multiple-chip"
              multiple
              fullWidth
              value={periods}
              onChange={(event) => handleSelect(event, 'period_ids', PERIODS)}
              input={<OutlinedInput id="select-multiple-chip" label="時代" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleChipDelete(value, 'period_ids', PERIODS)}
                      onMouseDown={(event) => {
                        if (selected.length === 1) {
                          return handleChipDelete(value, 'period_ids', PERIODS)
                        }
                        event.stopPropagation()
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {PERIODS.map((period) => (
                <MenuItem key={period} value={period}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl>
            <InputLabel id="prefecture-multiple-chip-label">都道府県</InputLabel>
            <Select
              labelId="prefecture-multiple-chip-label"
              id="prefecture-multiple-chip"
              multiple
              fullWidth
              value={prefectures}
              // value={prefectures.map((prefecture) => PREFECTURES[prefecture - 1])}
              onChange={(event) => handleSelect(event, 'prefecture_ids', PREFECTURES)}
              // onChange={handlePrefecture}
              input={<OutlinedInput id="select-multiple-chip" label="都道府県" />}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleChipDelete(value, 'prefecture_ids', PREFECTURES)}
                      onMouseDown={(event) => {
                        if (selected.length === 1) {
                          return handleChipDelete(value, 'prefecture_ids', PREFECTURES)
                        }
                        event.stopPropagation()
                      }}
                    />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {PREFECTURES.map((prefecture) => (
                <MenuItem key={prefecture} value={prefecture}>
                  {prefecture}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button variant="contained" sx={{ width: '100px', mx: 'auto', mt: 3 }} onClick={handleSearch}>
            検索
          </Button>
        </div>

        <label
          id="search-drawer-label"
          htmlFor="search-drawer-checkbox"
          className="block relative h-screen min-w-[48px] hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg" />
        </label>
      </div>
    </>
  )
}
