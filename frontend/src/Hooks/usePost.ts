import { PREFECTURES } from 'Constant/PREFECTURE'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { usePostContext } from 'Utils/PostContext'
import { User } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { getTokens } from 'Utils/handleCookie'
import { useState, useEffect, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const usePost = (loading = false) => {
  const [latlng, setLatlng] = useState<google.maps.LatLng>({ lat: () => 0, lng: () => 0 } as google.maps.LatLng)
  const [errorMessage, setErrorMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const { googleMap } = useGoogleMapsContext()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const { setCurrentUser } = useCurrentUserContext()
  const { prefectureId, periodId, setPrefectureId } = usePostContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (loading) return
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleMap, loading])

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

  return {
    latlng,
    errorMessage,
    file,
    setErrorMessage,
    setFile,
    handleSubmit
  }
}
