import { FormControl, InputLabel, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { usePostContext } from 'Utils/PostContext'

export const PrefectureSelect = () => {
  const { prefectureId, setPrefectureId } = usePostContext()

  return (
    <FormControl>
      <InputLabel id="prefecture-label">都道府県</InputLabel>
      <Select
        labelId="prefecture-label"
        id="prefecture"
        value={prefectureId?.toString()}
        label="都道府県"
        onChange={(event: SelectChangeEvent) => setPrefectureId(Number(event.target.value))}
      >
        {PREFECTURES.map((prefecture, index) => (
          <MenuItem key={index} value={index + 1}>
            {prefecture}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
