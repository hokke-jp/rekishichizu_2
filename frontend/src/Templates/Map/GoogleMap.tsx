import { GoogleMapsProvider } from 'Utils/GoogleMapsContext'
import { ReactNode } from 'react'

export const GoogleMap = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <GoogleMapsProvider>{children}</GoogleMapsProvider>
    </>
  )
}
