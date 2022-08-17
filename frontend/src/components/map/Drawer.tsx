import { useState } from 'react'

export const Drawer = () => {
  return (
    <div className="">
      <Drawers />
    </div>
  )
}

const Drawers = () => {
  const [postsChecked, setPostsChecked] = useState(true)
  const [searchChecked, setSearchChecked] = useState(false)
  return (
    <div className="flex">
      <input
        type="checkbox"
        checked={postsChecked}
        onChange={() => {
          setPostsChecked(!postsChecked)
        }}
        id="posts_drawer"
        className="absolute"
      />
      <input
        type="checkbox"
        checked={searchChecked}
        onChange={() => setSearchChecked(!searchChecked)}
        id="search_drawer"
        className="absolute"
      />
      <div
        id="posts_drawer_div"
        className="fixed z-20 -left-24 w-56 flex rounded-tr-3xl rounded-br-3xl border border-gray-100 bg-white overflow-hidden shadow-lg"
      >
        <div className="mt-10 mx-auto w-32 h-60 bg-gray-400"></div>
        <label
          id="posts_drawer_label"
          htmlFor="posts_drawer"
          className="block relative h-screen w-12 hover:bg-gray-50"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>

      <div
        id="search_drawer_div"
        className="fixed z-10 -left-10 w-56 flex rounded-tr-3xl rounded-br-3xl border border-gray-100 bg-white overflow-hidden shadow-lg"
      >
        <div className="mt-10 mx-auto w-32 h-60 bg-gray-400"></div>
        <label
          id="search_drawer_label"
          htmlFor="search_drawer"
          className="block relative h-screen w-12 hover:bg-gray-50"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </div>
  )
}
