import { ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
import { ButtonBase } from '@mui/material'
import Logo from '../images/app_logo.png'
import DefaultUserImage from '../images/default_user_image.jpg'
import Post from '../images/post.svg'
import Login from '../images/login.svg'
import CreateAccount from '../images/create_account.svg'

export const SideBar = () => {
  // const currentUser = true
  const currentUser = null

  return (
    <aside className="relative z-30 flex flex-col items-center justify-between h-screen w-[72px] bg-white shadow-xl shadow-gray-300">
      <NavLink to="/" className="mt-12 hover:opacity-80">
        <img className="h-12 w-12 rounded-md" src={Logo} alt="App logo" />
      </NavLink>
      <div className="w-full mb-6">
        {currentUser ? (
          <>
            <IconWrapper path="profile">
              <img
                src={DefaultUserImage}
                alt="User image"
                className="h-8 w-8 rounded-full"
              />
            </IconWrapper>
            <IconWrapper path="posts">
              <img src={Post} alt="Post icon" className="h-6 w-6" />
            </IconWrapper>
          </>
        ) : (
          <>
            <IconWrapper path="login">
              <img src={Login} alt="Login icon" className="h-6 w-6" />
            </IconWrapper>
            <IconWrapper path="createAccount">
              <img src={CreateAccount} alt="Signup icon" className="h-6 w-6" />
            </IconWrapper>
          </>
        )}
      </div>
    </aside>
  )
}

const IconWrapper = ({
  path,
  children
}: {
  path: string
  children: ReactNode
}) => {
  return (
    <div className="hover:bg-gray-100">
      <ButtonBase style={{ display: 'block', width: '100%' }}>
        <NavLink
          to={path}
          className={({ isActive }) =>
            (isActive ? 'bg-gray-100' : '').concat(
              ' flex items-center justify-center h-16 w-full'
            )
          }
        >
          {children}
        </NavLink>
      </ButtonBase>
    </div>
  )
}
