import { useMemo, useState } from 'react'

export const GeoLocation = ({ map }: { map: google.maps.Map | null }) => {
  const [hasAcquired, setHasAcquired] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const geoInfoWindow = useMemo(() => new google.maps.InfoWindow(), [])

  const geoLocation = () => {
    geoInfoWindow.close()

    // ブラウザが Geolocation に対応しているかを判定
    // 対応していない場合の処理
    if (!navigator.geolocation) {
      geoInfoWindow.setPosition(map?.getCenter())
      geoInfoWindow.setContent('Geolocation に対応していません。')
      geoInfoWindow.open(map)
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
        geoInfoWindow.open(map)
        map?.panTo(pos)
        map?.setZoom(12)
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

  // isLoading ?
  //    ローディング中のGeoLocationIcon
  //  : hasAcquired ?
  //      取得済みGeoLocationIcon
  //    :
  //      未取得GeoLocationIcon
  return (
    <div id="geo-wrapper">
      {isLoading ? (
        <button className="py-3 px-3 w-auto">
          <GeoLocationIcon
            tailwindClass="stroke-blue-400 fill-blue-400"
            flashAnime={true}
          />
        </button>
      ) : hasAcquired ? (
        <button
          className="geo-btn py-3 px-3 w-auto map-icon-anime"
          onClick={() => {
            geoLocation()
          }}
        >
          <GeoLocationIcon tailwindClass="stroke-black" flashAnime={false} />
        </button>
      ) : (
        <button
          className="geo-btn py-3 px-3 w-auto map-icon-anime"
          onClick={() => {
            setHasAcquired(!hasAcquired)
            geoLocation()
          }}
        >
          <GeoLocationIcon
            tailwindClass="fill-gray-500 stroke-neutral-500"
            flashAnime={false}
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
  flashAnime: boolean
}) => {
  return (
    <svg
      version="1.1"
      className={'w-6 h-6 stroke-[5px] '.concat(tailwindClass)}
      viewBox="0, 0, 200, 200"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      {flashAnime ? (
        <circle cx="100" cy="100" r="40" className="flash-anime" />
      ) : (
        <circle cx="100" cy="100" r="40" />
      )}
      <circle cx="100" cy="100" r="70" className="fill-transparent" />
      <line x1="100" y1="0" x2="100" y2="30" />
      <line x1="200" y1="100" x2="170" y2="100" />
      <line x1="100" y1="200" x2="100" y2="170" />
      <line x1="0" y1="100" x2="30" y2="100" />
    </svg>
  )
}
