import { NavLink } from 'react-router-dom'
import Logo from '../images/app_logo.png'

export const SideBar = () => {
  const currentUser = null

  return (
    <aside className="relative z-30 flex flex-col items-center justify-between bg-white shadow-xl shadow-gray-300 h-screen">
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
      <NavLink
        to="posts"
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
      {currentUser ? (
        <div className="mb-12">
          <div className="hover:bg-gray-100 mt-auto">
            <NavLink
              to="login"
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
          </div>
          <div className="hover:bg-gray-100 mt-auto">
            <NavLink
              to="posts"
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
        </div>
      ) : (
        <div className="mb-6">
          <div className="hover:bg-gray-100 mt-auto">
            <NavLink
              to="login"
              className={({ isActive }) =>
                (isActive ? 'bg-gray-100' : '').concat(
                  ' flex justify-center items-center mt-auto h-16 px-6'
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 256 256"
                className="h-6 w-6 stroke-black"
                strokeWidth="9"
              >
                <polyline
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="94.011 170 136 128 94.011 86"
                />
                <line
                  x1="24"
                  x2="135.971"
                  y1="128"
                  y2="128"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M136,40h56a8,8,0,0,1,8,8V208a8,8,0,0,1-8,8H136"
                />
              </svg>
            </NavLink>
          </div>
          <div className="hover:bg-gray-100 mt-auto">
            <NavLink
              to="createAccount"
              className={({ isActive }) =>
                (isActive ? 'bg-gray-100' : '').concat(
                  ' flex justify-center items-center mt-auto h-16 px-6'
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
              >
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M10 5.328a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-5 4a5 5 0 1 1 10 0 5 5 0 0 1-10 0Z"
                  clipRule="evenodd"
                />
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M2.516 21.328H4a.5.5 0 1 1 0 1H2a.5.5 0 0 1-.5-.5 8.5 8.5 0 0 1 17 0 .5.5 0 0 1-.5.5H7a.5.5 0 0 1 0-1h10.484a7.5 7.5 0 0 0-14.968 0zm13.656-15.5a.5.5 0 0 0 .5.5h5.656a.5.5 0 1 0 0-1h-5.656a.5.5 0 0 0-.5.5z"
                  clipRule="evenodd"
                />
                <path
                  fill="#000"
                  fillRule="evenodd"
                  d="M19.5 9.157a.5.5 0 0 1-.5-.5V3a.5.5 0 1 1 1 0v5.657a.5.5 0 0 1-.5.5Z"
                  clipRule="evenodd"
                />
              </svg>
            </NavLink>
          </div>
        </div>
      )}
    </aside>
  )
}
