import { logout } from '../session/session'
import { CurrentUserContext } from './CurrentUserContext'
import { EditEmailDialog } from './EditEmailDialog'
import { EditPasswordDialog } from './EditPasswordDialog'
import { EditProfileDialog } from './EditProfileDialog'
import { Lock, Edit, Email } from '@mui/icons-material'
import Logout from '@mui/icons-material/Logout'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'
import { useNavigate } from 'react-router-dom'

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
    logout()
      .then(() => {
        setCurrentUser(null)
        navigate('/')
      })
      .catch(() => {
        setCurrentUser(null)
        navigate('/')
      })
  }
  return (
    <div className="fixed top-2 right-3">
      <Box>
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
          <EditProfileDialog setAnchorEl={setAnchorEl}>
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            プロフィール
          </EditProfileDialog>
        </MenuItem>
        <MenuItem>
          <EditEmailDialog setAnchorEl={setAnchorEl}>
            <ListItemIcon>
              <Email fontSize="small" />
            </ListItemIcon>
            メールアドレス
          </EditEmailDialog>
        </MenuItem>
        <MenuItem>
          <EditPasswordDialog setAnchorEl={setAnchorEl}>
            <ListItemIcon>
              <Lock fontSize="small" />
            </ListItemIcon>
            パスワード
          </EditPasswordDialog>
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
    </div>
  )
}
