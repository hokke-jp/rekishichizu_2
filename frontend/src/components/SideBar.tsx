import { NavLink } from 'react-router-dom'
import Logo from '../images/app_logo.png'

export const SideBar = () => {
  return (
    <aside className="relative z-30 flex flex-col items-center bg-white shadow-xl shadow-gray-300 h-screen">
      <NavLink
        to="/"
        className={({ isActive }) =>
          (isActive ? '' : '').concat(' mt-12 hover:opacity-80')
        }
      >
        <img
          className="h-12 w-12 mx-auto rounded-md"
          src={Logo}
          alt="app logo"
        />
      </NavLink>
      <div className="hover:bg-gray-100 mt-auto mb-12">
        <NavLink
          to="posts"
          className={({ isActive }) =>
            (isActive ? 'bg-gray-100' : '').concat(
              ' flex justify-center items-center mt-auto h-16 px-6'
            )
          }
        >
          <svg
            className="h-5 w-5 text-red-700"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
        </NavLink>
        <NavLink
          to="page2"
          className={({ isActive }) =>
            (isActive ? 'bg-gray-100' : '').concat(
              ' flex justify-center items-center mt-auto h-16 px-6'
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </NavLink>
      </div>
    </aside>
  )
}
