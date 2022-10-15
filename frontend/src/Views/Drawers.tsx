import { SearchDrawer } from './SearchDrawer'
import NoImage from 'Images/no_image.jpg'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useGoogleMapsContext } from 'Utils/GoogleMapsContext'
import { axiosInstance } from 'Utils/axios'
import { ArticlesDrawer } from 'Views/ArticlesDrawer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Drawers = () => {
  const { googleMap } = useGoogleMapsContext()
  const { articles, isLoading, options, setArticles, setIsLoading, setOpenModalId } = useArticlesContext()
  const location = useLocation()

  useEffect(() => {
    axiosInstance
      .get('/articles', {
        params: {
          page: 1,
          ...options
        }
      })
      .then((response) => {
        setIsLoading(false)
        setArticles(response.data)
      })
      .catch((error) => {
        console.error('レスポンスエラー : ', error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

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
        setOpenModalId(article.id)
      })

      markers.push(marker)
    })
    return function cleanup() {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
    }
  }, [googleMap, articles, isLoading, setOpenModalId])

  return (
    <>
      <ArticlesDrawer />

      <SearchDrawer />
    </>
  )
}
