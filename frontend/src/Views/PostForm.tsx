import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { ImagePreview } from 'Templates/Post/ImagePreview'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { axiosInstance } from 'Utils/axios'
import { getTokens } from 'Utils/handleCookie'
import { FormEvent, useState } from 'react'

export const PostForm = () => {
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // const data = new FormData(event.currentTarget)
    const params = new FormData(event.currentTarget)
    params.append('lat', '1.2')
    params.append('lng', '1.2')
    params.append('image', file || '')
    params.append('period_id', periodId.toString())
    params.append('prefecture_id', prefectureId.toString())
    const tokens = getTokens()
    axiosInstance
      .post('/articles', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        setAlertSeverity('info')
        setAlertMessage('更新しました')
        console.log(response)
      })
      .catch((error) => {
        // setAlertMessage(error.response.data.errors.full_messages)
        setAlertSeverity('warning')
        console.error(error)
      })
  }

  const [prefectureId, setPrefectureId] = useState<number | ''>('')
  const [periodId, setPeriodId] = useState<number | ''>('')
  const handlePrefecture = (event: SelectChangeEvent) => {
    setPrefectureId(Number(event.target.value))
  }
  const handlePeriod = (event: SelectChangeEvent) => {
    setPeriodId(Number(event.target.value))
  }

  const [file, setFile] = useState<File | null>(null)

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
              value={prefectureId?.toString()}
              label="都道府県"
              onChange={handlePrefecture}
            >
              {PREFECTURES.map((prefecture, index) => (
                <MenuItem key={index} value={index + 1}>
                  {prefecture}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="period-label">時代</InputLabel>
            <Select
              labelId="period-label"
              id="period"
              value={periodId?.toString()}
              label="時代"
              onChange={handlePeriod}
            >
              {PERIODS.map((period, index) => (
                <MenuItem key={index} value={index + 1}>
                  {period}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <ImagePreview file={file} setFile={setFile} />
      </div>
      <TextField fullWidth label="説明" name="content" multiline rows={8} />
      <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end', width: '100px', mt: 2 }}>
        作成
      </Button>
    </Box>
  )
}
