import { ButtonBase } from '@mui/material'
import { useSearch } from 'Hooks/useSearch'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { SortBy } from 'Utils/Types'

interface Props {
  sortState: [SortBy, string, string]
}

export const Sort = ({ sortState }: Props) => {
  const { handleSort } = useSearch()
  const { options, setOptions } = useArticlesContext()

  return (
    <ButtonBase key={sortState[1]} onClick={() => handleSort(sortState[0])}>
      <input
        type="radio"
        id={sortState[1]}
        name="drone"
        value={sortState[1]}
        className="peer"
        hidden
        onChange={() => setOptions((prev) => ({ ...prev, sort_by: sortState[0] }))}
        checked={options.sort_by === sortState[0]}
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
