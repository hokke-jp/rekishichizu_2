import { ButtonBase } from '@mui/material'
import { useSearch } from 'Hooks/useSearch'
import { useSearchQueriesContext } from 'Utils/SearchQueriesContext'
import { SortBy } from 'Utils/Types'

interface Props {
  sortState: [SortBy, string, string]
}

export const Sort = ({ sortState }: Props) => {
  const { handleSort } = useSearch()
  const { searchQueries, setSearchQueries } = useSearchQueriesContext()

  return (
    <ButtonBase
      data-testid={sortState[1].concat('-button')}
      key={sortState[1]}
      onClick={() => handleSort(sortState[0])}
    >
      <input
        data-testid={sortState[1].concat('-input')}
        type="radio"
        id={sortState[1]}
        name="drone"
        value={sortState[1]}
        className="peer"
        hidden
        onChange={() => setSearchQueries((prev) => ({ ...prev, sort_by: sortState[0] }))}
        checked={searchQueries.sort_by === sortState[0]}
      />
      <label
        htmlFor={sortState[1]}
        className={'flex items-center justify-center w-full h-full peer-checked:bg-[#1876D3] peer-checked:text-white peer-checked:border-0 border-[#B7B7B7] hover:cursor-pointer'.concat(
          sortState[2]
        )}
      >
        <p>{sortState[1]}</p>
      </label>
    </ButtonBase>
  )
}
