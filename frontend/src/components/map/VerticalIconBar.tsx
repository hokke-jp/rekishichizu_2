import { FullScreen } from './FullScreen'
import { GeoLocation } from './GeoLocation'
import { Overall } from './Overall'

export const VerticalIconBar = () => {
  return (
    <div
      id="icon-bar"
      className="fixed top-0 right-0 flex flex-col justify-center items-center w-12 mt-12 mr-6 py-5 rounded-full bg-white shadow-lg border border-gray-200"
    >
      <FullScreen />

      <div className="w-8 border-t border-gray-300" />

      <Overall />

      <div className="w-8 border-t border-gray-300" />

      <GeoLocation />
    </div>
  )
}

// interface VerticalIconBarProps {
//   map: google.maps.Map | null
//   options: {
//     center: {
//       lat: number
//       lng: number
//     }
//     zoom: number
//     disableDefaultUI: boolean
//   }
// }

// export const VerticalIconBar: FC<VerticalIconBarProps> = ({ map, options }) => {
//   return (
//     <div
//       id="icon-bar"
//       className="fixed top-0 right-0 flex flex-col justify-center items-center w-12 mt-12 mr-6 py-5 rounded-full bg-white shadow-lg border border-gray-200"
//     >
//       <FullScreen />

//       <div className="w-8 border-t border-gray-300" />

//       <Overall map={map} options={options} />

//       <div className="w-8 border-t border-gray-300" />

//       <GeoLocation map={map} />
//     </div>
//   )
// }
