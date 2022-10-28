import { Button } from '@mui/material'
import { useSearch } from 'Hooks/useSearch'
import { PeriodSearch } from 'Templates/Search/PeriodSearch'
import { PrefectureSearch } from 'Templates/Search/PrefectureSearch'
import { Sort } from 'Templates/Search/Sort'
import { WordSearch } from 'Templates/Search/WordSearch'
import { SortBy } from 'Utils/Types'

const SORT_ARRAY: [SortBy, string, string][] = [
  ['created_at DESC', '最新', ' border-r border-b'],
  ['likes_count DESC', '人気', ' border-b'],
  ['period_id DESC', '古い', ' border-r'],
  ['period_id ASC', '新しい', '']
]

export const SearchDrawer = () => {
  const { handleSearch } = useSearch()

  return (
    <>
      <input type="checkbox" id="search-drawer-checkbox" hidden />
      <div
        id="search-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-lg overflow-hidden"
      >
        <div className="grow flex flex-col gap-y-10 min-h-screen py-10 pr-2 pl-8 overflow-scroll">
          <div className="grid grid-rows-2 grid-cols-2 min-h-[96px] border border-[#B7B7B7] rounded-2xl overflow-hidden">
            {SORT_ARRAY.map((sortState) => (
              <Sort sortState={sortState} key={sortState[1]} />
            ))}
          </div>

          <WordSearch />

          <PeriodSearch />

          <PrefectureSearch />

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
