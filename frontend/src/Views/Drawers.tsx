import { SearchDrawer } from './SearchDrawer'
import NoImage from 'Images/no_image.jpg'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { ArticlesDrawer } from 'Views/ArticlesDrawer'
import { useEffect } from 'react'

export const Drawers = () => {
  const { googleMap } = useGoogleMapsContext()
  const { articles, isLoading, handleOpen } = useArticlesContext()
  useEffect(() => {
    const markers = new google.maps.MVCArray()
    articles.forEach((article, index) => {
      const marker = new google.maps.Marker({
        position: { lat: article.lat, lng: article.lng },
        map: googleMap
      })
      const infoWindow = new google.maps.InfoWindow({
        content: article.image_url
          ? `<img src=${article.image_url} alt="Article Image" style="max-width: 600px; max-height: 200px;" />`
          : `<img src=${NoImage} alt="No Image" style="width: 200px;" />`
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

      marker.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return
        googleMap?.panTo(e.latLng)
        handleOpen(index)
      })

      markers.push(marker)
    })
    return function cleanup() {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
    }
  }, [googleMap, articles, isLoading, handleOpen])

  return (
    <>
      <ArticlesDrawer />

      <SearchDrawer />
    </>
  )
}
