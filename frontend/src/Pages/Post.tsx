import { Loader } from '@googlemaps/js-api-loader'
import { CircularProgress } from '@mui/material'
import { GoogleMapsProvider } from 'Utils/GoogleMapsContext'
import { PostContextProvider } from 'Utils/PostContext'
import { PostForm } from 'Views/PostForm'
import { VerticalIconBar } from 'Views/VerticalIconBar'
import { useState, useEffect } from 'react'

export const Post = () => {
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState<boolean>(false)
  useEffect(() => {
    ;(async () => {
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

  return googleMapsApiLoaded ? (
    <GoogleMapsProvider>
      <div className="flex">
        <PostContextProvider>
          <PostForm />
        </PostContextProvider>
        <div className="w-1/2 h-screen bg-gray-200">
          <div id="target" className="h-full" />
          <VerticalIconBar />
        </div>
      </div>
    </GoogleMapsProvider>
  ) : (
    <div className="flex">
      <PostForm loading />
      <div className="w-1/2 h-screen bg-gray-200">
        <div className="flex justify-center items-center h-full">
          <CircularProgress size={68} />
        </div>
      </div>
    </div>
  )
}
