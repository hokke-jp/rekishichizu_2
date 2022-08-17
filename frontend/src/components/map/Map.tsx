import { Drawer } from './Drawer'
import { Loader } from '@googlemaps/js-api-loader'
import { useCallback, useEffect, useState } from 'react'
import { VerticalIconBar } from './VerticalIconBar'

export const Map = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <Drawer />
      <div className="w-full h-full">
        <RootMap />
      </div>
    </div>
  )
}

const RootMap = () => {
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState<boolean>(false)

  const initGoogleMapsApi = useCallback(async () => {
    const loader = new Loader({
      // eslint-disable-next-line googlemaps/no-api-keys
      apiKey: 'AIzaSyCIX7ci0yBU4r9axzQEvNd5nefZiifw1bM',
      version: 'weekly',
      region: 'JP',
      language: 'ja'
    })
    await loader.load()
    setGoogleMapsApiLoaded(true)
  }, [])
  initGoogleMapsApi()

  return <>{googleMapsApiLoaded && <GoogleMaps />}</>
}

const GoogleMaps = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)

  interface Options {
    center: {
      lat: number
      lng: number
    }
    zoom: number
    disableDefaultUI: boolean
  }

  const options: Options = {
    center: { lat: 38, lng: 138 },
    zoom: 5,
    disableDefaultUI: true
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
  // pushメソッドを使い挿入しないとmapを操作できないと考えていたが,mapオブジェクトを渡せばmapを操作できたのでCSS:fixedで位置合わせをした
  // const iconBar = document.getElementById('icon-bar')
  // googleMap?.controls[google.maps.ControlPosition.TOP_RIGHT].push(
  //   iconBar as HTMLElement
  // )

  return (
    <>
      <div id="target" className="w-full h-full" />
      <VerticalIconBar map={googleMap} options={options} />
    </>
  )
}
