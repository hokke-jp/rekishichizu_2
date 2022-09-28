import { SkeletonCard } from 'Templates/Post/SkeletonCard'

export const Drawers = () => {
  return (
    <>
      <input type="checkbox" defaultChecked={true} id="posts-drawer-checkbox" hidden />
      <input type="checkbox" id="search-drawer-checkbox" hidden />
      <div
        id="posts-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-md shadow-gray-300 overflow-hidden"
      >
        <ul className="grow flex flex-col items-center gap-y-10 h-screen pt-10 pb-10 overflow-auto">
          {[...Array(4)].map((v, i) => (
            <SkeletonCard key={i} />
          ))}
        </ul>
        <label
          id="posts-drawer-label"
          htmlFor="posts-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>

      <div
        id="search-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-lg overflow-hidden"
      >
        <div className="grow flex flex-col items-center gap-y-3 pt-10">
          <div className="w-24 h-60 bg-gray-400"></div>
          <div className="w-24 h-60 bg-gray-400"></div>
          <div className="w-24 h-60 bg-gray-400"></div>
          <div className="w-24 h-60 bg-gray-400"></div>
        </div>
        <label
          id="search-drawer-label"
          htmlFor="search-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </>
  )
}
