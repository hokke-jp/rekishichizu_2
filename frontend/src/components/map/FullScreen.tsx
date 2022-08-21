import { useEffect, useState } from 'react'

export const FullScreen = () => {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(
    !!document.fullscreenElement
  )
  useEffect(() => {
    const eventFunc = () => {
      setIsFullScreen(!isFullScreen)
    }
    window.addEventListener('fullscreenchange', eventFunc)
    return () => window.removeEventListener('fullscreenchange', eventFunc)
  }, [isFullScreen])

  return (
    <>
      {isFullScreen ? (
        <button
          className="py-3 px-3 w-auto map-icon-anime"
          onClick={() => {
            document.exitFullscreen()
          }}
        >
          <svg
            version="1.1"
            className="w-6 h-6 stroke-black stroke-[2px]"
            viewBox="0, 0, 150, 150"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <polyline points="0.5,50.5 50.5,50.5 50.5,0.5" fill="none" />
            <polyline points="99.5,0.5 99.5,50.5 149.5,50.5" fill="none" />
            <polyline points="149.5,99.5 99.5,99.5 99.5,149.5" fill="none" />
            <polyline points="50.5,149.5 50.5,99.5 0.5,99.5" fill="none" />
          </svg>
        </button>
      ) : (
        <button
          className="py-3 px-3 w-auto map-icon-anime"
          onClick={() => {
            document.body.requestFullscreen()
          }}
        >
          <svg
            version="1.1"
            className="w-6 h-6 stroke-black stroke-[4px]"
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
      )}
    </>
  )
}
