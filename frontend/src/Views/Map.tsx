import { Loader } from '@googlemaps/js-api-loader'
import { GoogleMap } from 'Templates/Map/GoogleMap'
import { VerticalIconBar } from 'Views/VerticalIconBar'
import { useState, useCallback } from 'react'

export const Map = () => {
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

  return (
    <>
      {googleMapsApiLoaded && (
        <GoogleMap>
          <VerticalIconBar />
        </GoogleMap>
      )}
    </>
  )
}
