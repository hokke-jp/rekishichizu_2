import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { usePostContext } from 'Utils/PostContext'

export const PeriodSelect = () => {
  const { periodId, setPeriodId } = usePostContext()

  return (
    <FormControl>
      <InputLabel id="period-label">時代</InputLabel>
      <Select
        labelId="period-label"
        id="period"
        value={periodId?.toString()}
        label="時代"
        onChange={(event: SelectChangeEvent) => setPeriodId(Number(event.target.value))}
      >
        {PERIODS.map((period, index) => (
          <MenuItem key={index} value={index + 1}>
            {period}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
