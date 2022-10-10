import { useArticlesContext } from 'Utils/ArticlesContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { ArticlesDrawer } from 'Views/ArticlesDrawer'
import { useEffect } from 'react'

export const Drawers = () => {
  const { googleMap } = useGoogleMapsContext()
  const { articles, isLoading, handleOpen } = useArticlesContext()
  useEffect(() => {
    articles.forEach((article, index) => {
      const marker = new google.maps.Marker({
        position: { lat: article.lat, lng: article.lng },
        map: googleMap
      })
      const infoWindow = new google.maps.InfoWindow({
        content: `<img src=${article.image_url} alt="Article Image" style="max-width: 600px; max-height: 200px;" />`
        // content: `<div style="width: 300px; height: 200px" ><img src=${article.image_url} alt="Article Image" style="object-fit: cover" /></div>`
      })

      marker.addListener('mouseover', () => {
        infoWindow.open({
          anchor: marker,
          map: googleMap,
          shouldFocus: false
        })
      })

      marker.addListener('mouseout', () => {
        if (infoWindow) infoWindow.close()
      })

      marker.addListener('click', () => {
        handleOpen(index)
      })
    })
  }, [googleMap, articles, isLoading, handleOpen])

  return (
    <>
      <ArticlesDrawer />

      <input type="checkbox" id="search-drawer-checkbox" hidden />
      <div
        id="search-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-lg overflow-hidden"
      >
        <div className="grow flex flex-col items-center gap-y-3 pt-10">
          <div className="w-24 h-60 bg-gray-400"></div>
          <div className="w-24 h-60 bg-gray-400"></div>
          <div className="w-24 h-60 bg-gray-400"></div>
          <div className="w-24 h-60 bg-gray-400"></div>
        </div>
        <label
          id="search-drawer-label"
          htmlFor="search-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </>
  )
}
