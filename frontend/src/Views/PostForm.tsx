import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { ImagePreview } from 'Templates/Post/ImagePreview'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { axiosInstance } from 'Utils/axios'
import { getTokens } from 'Utils/handleCookie'
import { FormEvent, useState } from 'react'

const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
]
const periods = [
  '令和',
  '平成',
  '昭和',
  '大正',
  '明治',
  '江戸',
  '安土桃山',
  '室町',
  '鎌倉',
  '平安',
  '奈良',
  '飛鳥',
  '古墳',
  '弥生',
  '縄文',
  '石器',
  '人類以前'
]

export const PostForm = () => {
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const tokens = getTokens()
    axiosInstance
      .post(
        '/articles',
        {
          article: {
            title: data.get('title'),
            content: data.get('content'),
            lat: 1.2,
            lng: 1000.005,
            period_id: periodId,
            prefecture_id: prefectureId
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            ...tokens
          }
        }
      )
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
              {prefectures.map((prefecture, index) => (
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
              {periods.map((period, index) => (
                <MenuItem key={index} value={index + 1}>
                  {period}
                </MenuItem>
              ))}
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
