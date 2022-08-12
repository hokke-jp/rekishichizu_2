import { Drawer } from './Drawer'
import { Loader } from '@googlemaps/js-api-loader'
import { useCallback, useEffect, useState, FC } from 'react'
import ReactDOM from 'react-dom'
// import ReactDOM from 'react-dom/client'

const RootMap = () => {
  const [googleMapsApiLoaded, setGoogleMapsApiLoaded] = useState<boolean>(false)

  const initGoogleMapsApi = useCallback(async () => {
    const loader = new Loader({
      // eslint-disable-next-line googlemaps/no-api-keys
      apiKey: 'AIzaSyCIX7ci0yBU4r9axzQEvNd5nefZiifw1bM',
      version: 'weekly',
      region: 'JP',
      language: 'ja'
    })
    await loader.load()
    setGoogleMapsApiLoaded(true)
  }, [])
  initGoogleMapsApi()

  return <>{googleMapsApiLoaded && <GoogleMaps />}</>
}

const GoogleMaps = () => {
  const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)

  interface Options {
    center: {
      lat: number
      lng: number
    }
    zoom: number
    disableDefaultUI: boolean
  }

  const options: Options = {
    center: { lat: 38, lng: 138 },
    zoom: 6,
    disableDefaultUI: true
  }

  const initGoogleMaps = useCallback(() => {
    const map = new google.maps.Map(
      document.getElementById('target') as HTMLElement,
      options
    )
    setGoogleMap(map)
  }, [])

  useEffect(() => {
    initGoogleMaps()
  }, [initGoogleMaps])

  const controlButtonDiv = document.createElement('div')
  ReactDOM.render(
    <VerticalIconNav onClick={() => console.log('hi')} map={googleMap} />,
    controlButtonDiv
  )
  googleMap?.controls[google.maps.ControlPosition.TOP_RIGHT].push(
    controlButtonDiv as HTMLElement
  )

  return (
    <>
      <div id="target" className="w-full h-full" />
    </>
  )
}

// function SampleMap() {
//   const loader = new Loader({
//     // eslint-disable-next-line googlemaps/no-api-keys
//     apiKey: 'AIzaSyCIX7ci0yBU4r9axzQEvNd5nefZiifw1bM',
//     version: 'weekly'
//   })

//   const [googleMap, setGoogleMap] = useState<google.maps.Map | null>(null)
//   // loader.load().then(() => {
//   //   const map = new google.maps.Map(
//   //     document.getElementById('target') as HTMLElement,
//   //     {
//   //       center: { lat: 30, lng: -110 },
//   //       zoom: 8
//   //     }
//   //   )
//   //   setGoogleMap(map)
//   // })
//   // console.log(googleMap)

//   const initGoogleMaps = useCallback(() => {
//     const map = new google.maps.Map(
//       document.getElementById('target') as HTMLElement,
//       {
//         center: { lat: 30, lng: -110 },
//         zoom: 8
//       }
//     )
//     setGoogleMap(map)
//   }, [])

//   useEffect(() => {
//     initGoogleMaps()
//   }, [])

//   return (
//     <>
//       <div id="target" className="w-full h-full" />
//     </>
//   )
// }

interface VerticalIconNavProps {
  onClick(): void
  map: google.maps.Map | null
}

const VerticalIconNav: FC<VerticalIconNavProps> = ({ onClick, map }) => {
  return (
    <div
      id="icon-bar"
      className="flex flex-col justify-center items-center w-12 h-48 mt-12 mr-6 rounded-full bg-white shadow-lg border border-gray-200"
    >
      <button
        className="map-icon-wrapper mb-2 p-2 w-auto hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out"
        onClick={() => document.body.requestFullscreen()}
        // onClick={() => document.exitFullscreen()}
      >
        <svg
          version="1.1"
          className="w-5 h-5 stroke-black stroke-[8px]"
          viewBox="0, 0, 150, 150"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <polyline points="0.5,50.5 0.5,0.5 50.5,0.5" fill="none" />
          <polyline points="99.5,0.5 149.5,0.5 149.5,50.5" fill="none" />
          <polyline points="149.5,99.5 149.5,149.5 99.5,149.5" fill="none" />
          <polyline points="50.5,149.5 0.5,149.5 0.5,99.5" fill="none" />
        </svg>
      </button>

      <div className="w-8 border-t border-gray-300" />

      <button
        className="map-icon-wrapper my-2 p-2 w-auto hover:bg-gray-100 rounded-sm"
        onClick={() => {
          map?.panTo({ lat: 38, lng: 138 })
          map?.setZoom(5)
        }}
      >
        <svg
          version="1.1"
          className="w-6 h-6 stroke-black fill-transparent stroke-[16px]"
          viewBox="0 0 800 669.244"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <g>
            <path
              d="M587.033,1.673l-16.681,144.72h-0.943l-3.903,33.893h54.224l3.011-26.112h157.666L798,1.673H587.033z
            M212.532,664.005h143.556l10.856-94.108H223.395L212.532,664.005z M650.477,219.406h-85.493l-21.992,190.629h-51.04l4.018-34.88
            h-44.056l-4.024,34.88H241.077l-13.034,124.766h174.805l-8.919,65.594h93.777l6.436-55.789h142.544l-4.291,37.287h44.048
            l45.156-391.446h-67.786L650.477,219.406z M18.53,524.282h61.004L63.412,664.005H178.64l29.411-254.957H31.817L18.53,524.282z
            M2,667.571h44.055l9.78-84.735H11.773L2,667.571z"
            ></path>
          </g>
        </svg>
      </button>

      <div className="w-8 border-t border-gray-300" />

      <button
        className="map-icon-wrapper mt-2 p-2 w-auto hover:bg-gray-100 rounded-sm"
        onClick={() => onClick()}
      >
        <svg
          version="1.1"
          className="w-6 h-6 stroke-[5px] stroke-black fill-black"
          viewBox="0, 0, 200, 200"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="70" className="fill-transparent" />
          <line x1="100" y1="0" x2="100" y2="30" />
          <line x1="200" y1="100" x2="170" y2="100" />
          <line x1="100" y1="200" x2="100" y2="170" />
          <line x1="0" y1="100" x2="30" y2="100" />
        </svg>
      </button>
    </div>
  )
}

export const Map = () => {
  return (
    <div className="flex h-screen bg-gray-200">
      <Drawer />
      {/* <VerticalIconNav /> */}
      <div className="w-full h-full">
        <RootMap />
      </div>
    </div>
  )
}
