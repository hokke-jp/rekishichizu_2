import { createContext } from 'react'
interface Props {
  googleMap: google.maps.Map | null
  defaultOptions: {
    center: {
      lat: number
      lng: number
    }
    zoom: number
    disableDefaultUI: boolean
  }
}

export const GoogleMapsContext = createContext<Props>({
  googleMap: null,
  defaultOptions: {
    center: { lat: 38, lng: 138 },
    zoom: 5,
    disableDefaultUI: true
  }
})
