import { SkeletonCard } from 'Templates/Post/SkeletonCard'
import { axiosInstance } from 'Utils/axios'
import { useEffect } from 'react'

export const ArticlesDrawer = () => {
  useEffect(() => {
    axiosInstance.get('/articles').then((response) => {
      console.log(response)
    })
  }, [])

  return (
    <>
      <input type="checkbox" defaultChecked={true} id="articles-drawer-checkbox" hidden />
      <div
        id="articles-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-md shadow-gray-300 overflow-hidden"
      >
        <ul className="grow flex flex-col items-center gap-y-10 h-screen pt-10 pb-10 overflow-auto">
          {[...Array(4)].map((v, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
        <label
          id="articles-drawer-label"
          htmlFor="articles-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </>
  )
}
