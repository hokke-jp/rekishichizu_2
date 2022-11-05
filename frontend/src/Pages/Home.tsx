import { Loader } from '@googlemaps/js-api-loader'
import { CircularProgress } from '@mui/material'
import { ArticlesProvider } from 'Utils/ArticlesContext'
import { FetchArticleOptionsProvider } from 'Utils/FetchArticleOptionsContext'
import { GoogleMapsProvider } from 'Utils/GoogleMapsContext'
import { SearchQueriesContextProvider } from 'Utils/SearchQueriesContext'
import { Drawers } from 'Views/Drawers'
import { VerticalIconBar } from 'Views/VerticalIconBar'
import { useEffect, useState } from 'react'

export const Home = () => {
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
      <ArticlesProvider>
        <FetchArticleOptionsProvider>
          <SearchQueriesContextProvider>
            <div className="h-screen bg-gray-200">
              <Drawers />
              <div id="target" className="h-full" />
              <VerticalIconBar />
            </div>
          </SearchQueriesContextProvider>
        </FetchArticleOptionsProvider>
      </ArticlesProvider>
    </GoogleMapsProvider>
  ) : (
    <div className="flex justify-center items-center h-full bg-gray-200">
      <CircularProgress size={68} />
    </div>
  )
}
