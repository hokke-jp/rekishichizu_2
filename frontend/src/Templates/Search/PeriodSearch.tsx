import { FormControl, InputLabel, Select, OutlinedInput, Box, Chip, MenuItem } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
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

export const PeriodSearch = () => {
  const { periods, handleSelect, handleChipDelete } = useSearch()

  return (
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
  )
}
