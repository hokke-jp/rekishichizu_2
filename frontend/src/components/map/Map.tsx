import { Loader } from '@googlemaps/js-api-loader'
import { Drawer } from 'components/map/Drawer'
import { GoogleMapsContext } from 'components/map/GoogleMapsContext'
import { VerticalIconBar } from 'components/map/VerticalIconBar'
import { useCallback, useEffect, useState } from 'react'

// マップ全体のレイアウト
export const Map = () => {
  return (
    <div className="h-screen bg-gray-200">
      <Drawer />
      <div className="h-full w-full">
        <InitMap />
      </div>
    </div>
  )
}

// マップ取得
const InitMap = () => {
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState<boolean>(false)
  const initGoogleMapsApi = useCallback(async () => {
    const loader = new Loader({
      apiKey: `${process.env.REACT_APP_API_KEY}`,
      version: 'weekly',
      region: 'JP',
      language: 'ja'
    })
    await loader.load()
    setGoogleMapsApiLoaded(true)
  }, [])
  initGoogleMapsApi()

  return <>{googleMapsApiLoaded && <GoogleMap />}</>
}

const GoogleMap = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)
  interface Options {
    center: {
      lat: number
      lng: number
    }
    zoom: number
    disableDefaultUI: boolean
    restriction: {
      latLngBounds: {
        north: number
        south: number
        west: number
        east: number
      }
      strictBounds: boolean
    }
  }
  const options: Options = {
    center: { lat: 38, lng: 138 },
    zoom: 5,
    disableDefaultUI: true,
    restriction: {
      latLngBounds: {
        north: 65.0,
        south: 14.0,
        west: 100.0,
        east: 180.0
      },
      strictBounds: false
    }
  }
  const initGoogleMaps = useCallback(() => {
    const map = new google.maps.Map(
      document.getElementById('target') as HTMLElement,
      options
    )
    setGoogleMap(map)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    initGoogleMaps()
  }, [initGoogleMaps])
  // GoogleMapに独自コンポーネントを挿入
  // GooglemapInstance.pushメソッドを使い挿入しないとmapを操作できないと考えていたが,mapオブジェクトを渡せばmapを操作できたのでCSS:fixedで位置合わせをした
  // const iconBar = document.getElementById('icon-bar')
  // googleMap?.controls[google.maps.ControlPosition.TOP_RIGHT].push(
  //   iconBar as HTMLElement
  // )

  return (
    <>
      <div id="target" className="w-full h-full" />
      <GoogleMapsContext.Provider
        value={{
          googleMap,
          defaultOptions: options
        }}
      >
        {/* {Children} */}
        <VerticalIconBar />
      </GoogleMapsContext.Provider>
    </>
  )
}
