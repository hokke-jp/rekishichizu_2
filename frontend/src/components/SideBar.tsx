import Logo from '../images/app_logo.png'
import CreateAccount from '../images/create_account.svg'
import DefaultUserImage from '../images/default_user_image.jpg'
import EasyLogin from '../images/easy_login.svg'
import Login from '../images/login.svg'
import Post from '../images/post.svg'
import { axiosInstance } from '../utils/axios'
import { CurrentUserContext } from './user/CurrentUserContext'
import { ButtonBase, Tooltip } from '@mui/material'
import Cookies from 'js-cookie'
import { ReactNode, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

export const SideBar = () => {
  const { currentUser } = useContext(CurrentUserContext)

  return (
    <>
      <div className="w-[72px]" />
      <aside className="fixed top-0 left-0 z-30 flex flex-col items-center justify-between h-screen w-[72px] bg-white shadow-xl shadow-gray-300">
        <NavLink to="/" className="mt-12 hover:opacity-80">
          <img className="h-12 w-12 rounded-md" src={Logo} alt="App logo" />
        </NavLink>
        <div className="w-full mb-6">
          {currentUser ? (
            <>
              <IconWrapper path={currentUser.name} tooltip="マイページ">
                <img
                  src={DefaultUserImage}
                  alt="User image"
                  className="h-8 w-8 rounded-full"
                />
              </IconWrapper>
              <IconWrapper path="posts" tooltip="新規投稿">
                <img src={Post} alt="Post icon" className="h-6 w-6" />
              </IconWrapper>
            </>
          ) : (
            <>
              <EasyLoginWrapper>
                <img
                  src={EasyLogin}
                  alt="Easy Login icon"
                  className="h-6 w-6"
                />
              </EasyLoginWrapper>
              <IconWrapper path="login" tooltip="ログイン">
                <img src={Login} alt="Login icon" className="h-6 w-6" />
              </IconWrapper>
              <IconWrapper path="createAccount" tooltip="アカウント作成">
                <img
                  src={CreateAccount}
                  alt="Signup icon"
                  className="h-6 w-6"
                />
              </IconWrapper>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

const IconWrapper = ({
  path,
  tooltip,
  children
}: {
  path: string
  tooltip: string
  children: ReactNode
}) => {
  return (
    <Tooltip title={tooltip} placement="right">
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
    </Tooltip>
  )
}

const EasyLoginWrapper = ({ children }: { children: ReactNode }) => {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()
  const handleClick = () => {
    ;(async () => {
      await axiosInstance
        .post('/auth/sign_in', {
          email: 'sample01@example.com',
          password: 'password'
        })
        .then((response) => {
          Cookies.set('uid', response.headers.uid)
          Cookies.set('client', response.headers.client)
          Cookies.set('access-token', response.headers['access-token'])
          setCurrentUser(response.data.data)
          navigate(`/sample01`)
        })
        .catch((error) => {
          console.error(error)
        })
    })()
  }
  return (
    <Tooltip title="簡単ログイン" placement="right">
      <div className="hover:bg-gray-100" onClick={handleClick}>
        <ButtonBase style={{ display: 'block', width: '100%' }}>
          <div className="flex items-center justify-center h-16 w-full">
            {children}
          </div>
        </ButtonBase>
      </div>
    </Tooltip>
  )
}
