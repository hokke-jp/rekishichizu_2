import { GoogleMapsProvider } from 'Utils/GoogleMapsContext'
import { ReactNode } from 'react'

export const GoogleMap = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div id="target" className="h-screen" />
      <GoogleMapsProvider>{children}</GoogleMapsProvider>
    </>
  )
}
