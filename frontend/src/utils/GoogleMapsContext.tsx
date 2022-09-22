import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'

interface DefaultOptions {
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
const defaultOptions: DefaultOptions = {
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
interface Props {
  googleMap: google.maps.Map | null
  defaultOptions: DefaultOptions
}

const GoogleMapsContext = createContext<Props>({
  googleMap: null,
  defaultOptions
})
export const useGoogleMapsContext = () => {
  return useContext(GoogleMapsContext)
}
export const GoogleMapsProvider = ({ children }: { children: ReactNode }) => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)
  const initGoogleMaps = useCallback(() => {
    const map = new google.maps.Map(
      document.getElementById('target') as HTMLElement,
      defaultOptions
    )
    setGoogleMap(map)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    initGoogleMaps()
  }, [initGoogleMaps])
  const value = {
    googleMap,
    defaultOptions
  }

  return (
    <GoogleMapsContext.Provider value={value}>
      {children}
    </GoogleMapsContext.Provider>
  )
}
