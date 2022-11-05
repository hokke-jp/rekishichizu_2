import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'
import { useSearch } from 'Hooks/useSearch'
import { useSearchQueriesContext } from 'Utils/SearchQueriesContext'

export const WordSearch = () => {
  const { handleSearch } = useSearch()
  const { searchQueries, setSearchQueries } = useSearchQueriesContext()

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-search">キーワード検索</InputLabel>
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        value={searchQueries.words}
        onChange={(event) => setSearchQueries((prev) => ({ ...prev, words: event.target.value }))}
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
  )
}
