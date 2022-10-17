import { FullScreen } from 'Templates/Map/FullScreen'
import { GeoLocation } from 'Templates/Map/GeoLocation'
import { Overall } from 'Templates/Map/Overall'

export const VerticalIconBar = () => {
  return (
    <div
      id="icon-bar"
      className="fixed top-0 right-0 flex flex-col justify-center items-center w-12 mt-12 mr-6 py-5 rounded-full bg-white shadow-lg border border-gray-200"
    >
      <FullScreen />

      <hr className="w-8 border-t border-gray-300" />

      <Overall />

      <hr className="w-8 border-t border-gray-300" />

      <GeoLocation />
    </div>
  )
}
