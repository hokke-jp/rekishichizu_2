import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ImagePreview } from 'Templates/Post/ImagePreview'
import { FormEvent, useState } from 'react'

export const PostForm = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log(data.get('title'))
    console.log(data.get('description'))
    console.log(prefecture)
    console.log(period)
  }

  const [prefecture, setPrefecture] = useState('')
  const [period, setPeriod] = useState('')
  const handlePrefecture = (event: SelectChangeEvent) => {
    setPrefecture(event.target.value as string)
  }
  const handlePeriod = (event: SelectChangeEvent) => {
    setPeriod(event.target.value as string)
  }

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '50%', p: 8 }}
      onSubmit={handleSubmit}
    >
      <TextField fullWidth label="タイトル" name="title" autoFocus />
      <div className="flex gap-x-12">
        <div className="flex flex-col justify-around w-48">
          <FormControl>
            <InputLabel id="prefecture-label">都道府県</InputLabel>
            <Select
              labelId="prefecture-label"
              id="prefecture"
              value={prefecture}
              label="都道府県"
              onChange={handlePrefecture}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="period-label">時代</InputLabel>
            <Select labelId="period-label" id="period" value={period} label="時代" onChange={handlePeriod}>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
        </div>
        <ImagePreview />
      </div>
      <TextField fullWidth label="説明文" name="description" multiline rows={8} />
      <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end', width: '100px', mt: 2 }}>
        作成
      </Button>
    </Box>
  )
}
