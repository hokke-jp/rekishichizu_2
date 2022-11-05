import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from '@mui/material'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { useSearch } from 'Hooks/useSearch'

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

export const PrefectureSearch = () => {
  const { prefectures, handleSelect, handleChipDelete } = useSearch()

  return (
    <FormControl>
      <InputLabel id="prefecture-multiple-chip-label">都道府県</InputLabel>
      <Select
        data-testid="prefecture-input"
        labelId="prefecture-multiple-chip-label"
        id="prefecture-multiple-chip"
        multiple
        fullWidth
        value={prefectures}
        onChange={(event) => handleSelect(event, 'prefecture_ids', PREFECTURES)}
        input={<OutlinedInput id="select-multiple-chip" label="都道府県" />}
        renderValue={(selected) => (
          <Box data-testid="prefecture-selected-box" sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
  )
}
