import { Loader } from '@googlemaps/js-api-loader'
import { CircularProgress } from '@mui/material'
import { GoogleMapsProvider } from 'Utils/GoogleMapsContext'
import { VerticalIconBar } from 'Views/VerticalIconBar'
import { useEffect, useState } from 'react'

export const Map = () => {
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
      console.log('called')
      const loader = new Loader({
        apiKey: `${process.env.REACT_APP_API_KEY}`,
        version: 'weekly',
        region: 'JP',
        language: 'ja'
      })
      await loader.load()
      setGoogleMapsApiLoaded(true)
    })()
  }, [])

  return (
    <>
      {googleMapsApiLoaded ? (
        <>
          <div id="target" className="h-full" />
          <GoogleMapsProvider>
            <VerticalIconBar />
          </GoogleMapsProvider>
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <CircularProgress size={68} />
        </div>
      )}
    </>
  )
}
