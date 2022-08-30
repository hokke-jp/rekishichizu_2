import { SideBar } from './SideBar'
// import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
// import PostAddIcon from '@mui/icons-material/PostAdd';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import LoginIcon from '@mui/icons-material/Login'
import { IconButton } from '@mui/material'
import { Link } from 'react-router-dom'

export const GlobalNav = () => {
  return (
    <div className="sticky top-0 h-screen w-20 shadow-md">
      <div className="flex items-center justify-center h-full">
        <nav className="flex flex-col items-center">
          <div className="my-5">
            <IconButton>
              <Link to="/">
                <HomeOutlinedIcon color="primary" sx={{ fontSize: 48 }} />
              </Link>
            </IconButton>
          </div>
          <div className="my-5">
            <IconButton>
              <Link to="/posts">
                <LoginIcon color="primary" sx={{ fontSize: 44 }} />
              </Link>
            </IconButton>
          </div>
        </nav>
      </div>
      <SideBar></SideBar>
    </div>
  )
}
