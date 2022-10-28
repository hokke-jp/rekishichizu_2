import SearchIcon from '@mui/icons-material/Search'
import { FormControl, InputLabel, OutlinedInput, IconButton } from '@mui/material'
import { useSearch } from 'Hooks/useSearch'
import { useArticlesContext } from 'Utils/ArticlesContext'

export const WordSearch = () => {
  const { handleSearch } = useSearch()
  const { options, setOptions } = useArticlesContext()

  return (
    <FormControl variant="outlined">
      <InputLabel htmlFor="outlined-adornment-search">キーワード検索</InputLabel>
      <OutlinedInput
        id="outlined-adornment-search"
        type="text"
        value={options.words}
        onChange={(event) => setOptions((prev) => ({ ...prev, words: event.target.value }))}
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
