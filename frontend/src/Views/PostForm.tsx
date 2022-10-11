import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { PERIODS } from 'Constant/PERIOD'
import { PREFECTURES } from 'Constant/PREFECTURE'
import { Alert } from 'Templates/Form/Alert'
import { ImagePreview } from 'Templates/Post/ImagePreview'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens } from 'Utils/handleCookie'
import { FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  loaded?: boolean
}

export const PostForm = ({ loaded = false }: Props) => {
  const { googleMap } = useGoogleMapsContext()
  const [latlng, setLatlng] = useState<google.maps.LatLng>({ lat: () => 0, lng: () => 0 } as google.maps.LatLng)
  useEffect(() => {
    if (!loaded) return
    if (googleMap) {
      let marker = new google.maps.Marker()
      google.maps.event.addListener(googleMap, 'click', (e: google.maps.MapMouseEvent) => {
        const geocoder = new google.maps.Geocoder()
        geocoder.geocode({ location: e.latLng }, (results, status) => {
          if (!e.latLng) return
          if (status === 'OK' && results && results[0]) {
            let prefecture = ''
            let isJapan = false
            results.forEach((result) => {
              if (result.types.includes('administrative_area_level_1')) {
                prefecture = result.address_components[0].long_name
              }
              if (result.types.includes('country') && result.formatted_address === '日本') {
                isJapan = true
              }
            })

            if (prefecture && isJapan) {
              setLatlng(e.latLng)
              if (marker) {
                marker.setMap(null)
              }
              marker = new google.maps.Marker({
                position: e.latLng,
                map: googleMap,
                animation: google.maps.Animation.DROP
              })

              const preId = PREFECTURES.indexOf(prefecture) + 1
              setPrefectureId(preId)
            }
          } else if (status === 'ZERO_RESULTS') {
            alert('不明なアドレスです： ' + status)
          } else {
            alert('失敗しました： ' + status)
          }
        })
      })
    }
    // return google.maps.event.clearInstanceListeners(googleMap || {})
  }, [googleMap, loaded])

  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const { setCurrentUser } = useCurrentUserContext()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const latLngZeroCheck = (params: FormData) => {
    params.get('lat') === '0' && params.append('lat', '')
    params.get('lng') === '0' && params.append('lng', '')
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const params = new FormData(event.currentTarget)
    params.append('image', file || '')
    params.append('period_id', periodId.toString())
    params.append('prefecture_id', prefectureId.toString())
    latLngZeroCheck(params)
    const tokens = getTokens()
    axiosInstance
      .post('/articles', params, {
        headers: {
          'Content-Type': 'application/json',
          ...tokens
        }
      })
      .then((response) => {
        const articleIds = response.data.article_ids
        setCurrentUser((prevState: User | undefined) => ({ ...prevState, article_ids: articleIds } as User))
        sessionStorage.setItem('article_ids', articleIds)
        setAlertSeverity('success')
        setAlertMessage('投稿しました')
        navigate('/')
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage(error.response.data.errors.join('\n'))
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
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        p: 6
      }}
      onSubmit={handleSubmit}
    >
      <Alert errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      <TextField fullWidth label="タイトル" name="title" autoFocus />
      <TextField type="number" value={latlng?.lat()} name="lat" sx={{ display: 'none' }} />
      <TextField type="number" value={latlng?.lng()} name="lng" sx={{ display: 'none' }} />
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
