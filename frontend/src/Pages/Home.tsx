import { Drawers } from 'Views/Drawers'
import { Map } from 'Views/Map'

export const Home = () => {
  return (
    <div className="h-screen bg-gray-200">
      <Drawers />
      <Map />
    </div>
  )
}
