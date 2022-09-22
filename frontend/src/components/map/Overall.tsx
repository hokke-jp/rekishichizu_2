import { GoogleMapsContext } from 'components/map/GoogleMapsContext'
import { useContext } from 'react'

export const Overall = () => {
  const { googleMap, defaultOptions } = useContext(GoogleMapsContext)
  return (
    <button
      className="hover-and-click-effect w-auto py-4 px-3"
      onClick={() => {
        googleMap?.panTo(defaultOptions.center)
        googleMap?.setZoom(defaultOptions.zoom)
      }}
    >
      <svg
        version="1.1"
        viewBox="0 0 800 669.244"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="h-6 w-6 stroke-black fill-transparent stroke-[16px]"
      >
        <path
          d="M587.033,1.673l-16.681,144.72h-0.943l-3.903,33.893h54.224l3.011-26.112h157.666L798,1.673H587.033z
            M212.532,664.005h143.556l10.856-94.108H223.395L212.532,664.005z M650.477,219.406h-85.493l-21.992,190.629h-51.04l4.018-34.88
            h-44.056l-4.024,34.88H241.077l-13.034,124.766h174.805l-8.919,65.594h93.777l6.436-55.789h142.544l-4.291,37.287h44.048
            l45.156-391.446h-67.786L650.477,219.406z M18.53,524.282h61.004L63.412,664.005H178.64l29.411-254.957H31.817L18.53,524.282z
            M2,667.571h44.055l9.78-84.735H11.773L2,667.571z"
        ></path>
      </svg>
    </button>
  )
}
