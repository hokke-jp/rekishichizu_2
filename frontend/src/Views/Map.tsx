import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap } from 'Templates/Map/GoogleMap'
import { VerticalIconBar } from 'Views/VerticalIconBar'
import { useState } from 'react'

export const Map = () => {
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState<boolean>(false)
  const initGoogleMapsApi = async () => {
    console.log('called')
    const loader = new Loader({
      apiKey: `${process.env.REACT_APP_API_KEY}`,
      version: 'weekly',
      region: 'JP',
      language: 'ja'
    })
    await loader.load()
    setGoogleMapsApiLoaded(true)
  }
  initGoogleMapsApi()
  // const [count, setCount] = useState(0)

  return (
    <>
      {/* <div className="flex flex-row-reverse">
        count : {count}
        <button onClick={() => setCount((p) => p + 1)}>btn</button>
        <button onClick={() => setGoogleMapsApiLoaded(true)}>btn2</button>
      </div> */}
      {googleMapsApiLoaded && (
        <GoogleMap>
          <VerticalIconBar />
        </GoogleMap>
      )}
    </>
  )
}
