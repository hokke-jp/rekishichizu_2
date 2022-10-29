import NoImage from 'Images/no_image.jpg'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useFetchArticleOptionsContext } from 'Utils/FetchArticleOptionsContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { useEffect } from 'react'

export const useMap = () => {
  const { googleMap } = useGoogleMapsContext()
  const { articles } = useArticlesContext()
  const { fetchArticleOptions, setFetchArticleOptions } = useFetchArticleOptionsContext()

  useEffect(() => {
    const markers = new google.maps.MVCArray()
    articles.forEach((article) => {
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
        setFetchArticleOptions((prev) => ({ ...prev, openModalId: article.id }))
      })

      markers.push(marker)
    })
    return function cleanup() {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
    }
  }, [googleMap, articles, fetchArticleOptions.isLoading, setFetchArticleOptions])
}
