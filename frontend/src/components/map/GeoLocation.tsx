import { GoogleMapsContext } from 'components/map/GoogleMapsContext'
import { useContext, useMemo, useState } from 'react'

export const GeoLocation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const geoInfoWindow = useMemo(() => new google.maps.InfoWindow(), [])
  const { googleMap } = useContext(GoogleMapsContext)
  const geoLocation = () => {
    geoInfoWindow.close()

    // ブラウザが Geolocation に対応しているかを判定
    // 対応していない場合の処理
    if (!navigator.geolocation) {
      geoInfoWindow.setPosition(googleMap?.getCenter())
      geoInfoWindow.setContent('Geolocation に対応していません。')
      geoInfoWindow.open(googleMap)
    }

    // ブラウザが対応している場合、position にユーザーの位置情報が入る
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      // [第1引数] 取得に成功した場合の関数
      function (position) {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        geoInfoWindow.setPosition(pos)
        geoInfoWindow.setContent('現在位置を取得しました。')
        geoInfoWindow.open(googleMap)
        googleMap?.panTo(pos)
        googleMap?.setZoom(12)
        setIsLoading(false)
      },

      // [第2引数] 取得に失敗した場合の関数
      function (error) {
        const errorInfo = [
          '原因不明のエラーが発生しました。',
          '位置情報の取得が許可されませんでした。',
          '電波状況などで位置情報が取得できませんでした。',
          '位置情報の取得に時間がかかり過ぎてタイムアウトしました。'
        ]
        const errorNo = error.code
        const errorMessage =
          '[エラー番号: ' + errorNo + ']\n' + errorInfo[errorNo]
        alert(errorMessage)
        setIsLoading(false)
      },

      // [第3引数] オプション
      {
        enableHighAccuracy: false,
        timeout: 4000,
        maximumAge: 2000
      }
    )
  }

  return (
    <div id="geo-wrapper">
      {isLoading ? (
        <button className="w-auto p-3">
          <GeoLocationIcon
            tailwindClass="stroke-blue-400 fill-blue-400"
            flashAnime="flash-anime"
          />
        </button>
      ) : (
        <button
          className="hover-and-click-effect w-auto p-3"
          onClick={() => {
            geoLocation()
          }}
        >
          <GeoLocationIcon
            tailwindClass="stroke-black"
            flashAnime={undefined}
          />
        </button>
      )}
    </div>
  )
}

const GeoLocationIcon = ({
  tailwindClass,
  flashAnime
}: {
  tailwindClass: string
  flashAnime: string | undefined
}) => {
  return (
    <svg
      version="1.1"
      className={'w-6 h-6 stroke-[5px] '.concat(tailwindClass)}
      viewBox="0, 0, 200, 200"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <circle cx="100" cy="100" r="40" className={flashAnime} />
      <circle cx="100" cy="100" r="70" className="fill-transparent" />
      <line x1="100" y1="0" x2="100" y2="30" />
      <line x1="200" y1="100" x2="170" y2="100" />
      <line x1="100" y1="200" x2="100" y2="170" />
      <line x1="0" y1="100" x2="30" y2="100" />
    </svg>
  )
}
