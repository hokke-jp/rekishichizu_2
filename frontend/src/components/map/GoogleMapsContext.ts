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
    restriction: {
      latLngBounds: {
        north: number
        south: number
        west: number
        east: number
      }
      strictBounds: boolean
    }
  }
}

export const GoogleMapsContext = createContext<Props>({
  googleMap: null,
  defaultOptions: {
    center: { lat: 38, lng: 138 },
    zoom: 5,
    disableDefaultUI: true,
    restriction: {
      latLngBounds: {
        north: 65.0,
        south: 14.0,
        west: 100.0,
        east: 180.0
      },
      strictBounds: false
    }
  }
})
