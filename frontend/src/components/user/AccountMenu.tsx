import * as React from 'react'
import Box from '@mui/material/Box'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Logout from '@mui/icons-material/Logout'
import { Settings, Edit } from '@mui/icons-material'
import { EditProfileDialog } from './EditProfileDialog'
import { EditRegistryDialog } from './EditRegistryDialog'
import { CurrentUserContext } from './CurrentUserContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { axiosInstance } from '../../utils/axios'

export const AccountMenu = () => {
  const { setCurrentUser } = React.useContext(CurrentUserContext)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const navigate = useNavigate()
  const handleLogout = () => {
    ;(async () => {
      await axiosInstance
        .delete('/auth/sign_out', {
          params: {
            uid: Cookies.get('uid'),
            client: Cookies.get('client'),
            // eslint-disable-next-line no-useless-computed-key
            ['access-token']: Cookies.get('access-token')
          }
        })
        .then(() => {
          Cookies.remove('uid')
          Cookies.remove('client')
          Cookies.remove('access-token')
          setCurrentUser(null)
          navigate('/')
        })
        .catch((error) => {
          console.error(error)
          Cookies.remove('uid')
          Cookies.remove('client')
          Cookies.remove('access-token')
          setCurrentUser(null)
          navigate('/')
        })
    })()
  }
  return (
    <>
      <Box
        pt={1}
        pr={2}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ ml: 2 }}
          aria-controls={open ? 'account-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
        >
          <MoreHorizIcon sx={{ width: 32, height: 32 }}></MoreHorizIcon>
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem>
          <EditProfileDialog>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            プロフィール
          </EditProfileDialog>
        </MenuItem>
        <MenuItem>
          <EditRegistryDialog>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            登録情報
          </EditRegistryDialog>
        </MenuItem>
        <Divider />
        <MenuItem>
          <button className="flex items-center" onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            ログアウト
          </button>
        </MenuItem>
      </Menu>
    </>
  )
}
