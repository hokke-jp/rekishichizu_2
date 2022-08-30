export const Drawer = () => {
  return (
    <div className="flex">
      <input
        type="checkbox"
        defaultChecked={true}
        id="posts-drawer-checkbox"
        className="absolute"
      />
      <input type="checkbox" id="search-drawer-checkbox" className="absolute" />
      <div
        id="posts-drawer-div"
        className="flex rounded-tr-3xl rounded-br-3xl border border-gray-100 bg-white overflow-hidden shadow-lg"
      >
        <div className="mt-10 mx-auto w-32 h-60 bg-gray-400"></div>
        <label
          id="posts-drawer-label"
          htmlFor="posts-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-50"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>

      <div
        id="search-drawer-div"
        className="flex rounded-tr-3xl rounded-br-3xl border border-gray-100 bg-white overflow-hidden shadow-lg"
      >
        <div className="mt-10 mx-auto w-32 h-60 bg-gray-400"></div>
        <label
          id="search-drawer-label"
          htmlFor="search-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-50"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </div>
  )
}
// export const Drawer = () => {
//   const [postsChecked, setPostsChecked] = useState(true)
//   const [searchChecked, setSearchChecked] = useState(false)
//   return (
//     <div className="flex">
//       <input
//         type="checkbox"
//         checked={postsChecked}
//         onChange={() => {
//           setPostsChecked(!postsChecked)
//         }}
//         id="posts-drawer-checkbox"
//         className="absolute"
//       />
//       <input
//         type="checkbox"
//         checked={searchChecked}
//         onChange={() => setSearchChecked(!searchChecked)}
//         id="search-drawer-checkbox"
//         className="absolute"
//       />
//       <div
//         id="posts-drawer-div"
//         className="fixed z-20 -left-24 w-56 flex rounded-tr-3xl rounded-br-3xl border border-gray-100 bg-white overflow-hidden shadow-lg"
//       >
//         <div className="mt-10 mx-auto w-32 h-60 bg-gray-400"></div>
//         <label
//           id="posts-drawer-label"
//           htmlFor="posts-drawer-checkbox"
//           className="block relative h-screen w-12 hover:bg-gray-50"
//         >
//           <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
//         </label>
//       </div>

//       <div
//         id="search-drawer-div"
//         className="fixed z-10 -left-10 w-56 flex rounded-tr-3xl rounded-br-3xl border border-gray-100 bg-white overflow-hidden shadow-lg"
//       >
//         <div className="mt-10 mx-auto w-32 h-60 bg-gray-400"></div>
//         <label
//           id="search-drawer-label"
//           htmlFor="search-drawer-checkbox"
//           className="block relative h-screen w-12 hover:bg-gray-50"
//         >
//           <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
//         </label>
//       </div>
//     </div>
//   )
// }
