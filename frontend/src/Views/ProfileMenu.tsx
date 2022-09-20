import { Logout } from '@mui/icons-material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useLogout } from 'Hooks/useLogout'
import { ProfileDialogEmail } from 'Templates/ProfileDialogEmail'
import { ProfileDialogPassword } from 'Templates/ProfileDialogPassword'
import { ProfileMenuItem } from 'Templates/ProfileMenuItem'
import { useState } from 'react'

export const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { logout } = useLogout()

  return (
    <div className="fixed top-2 right-3">
      <Box>
        <IconButton
          onClick={handleClick}
          size="small"
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
          <ProfileDialogEmail setAnchorEl={setAnchorEl} />
        </MenuItem>
        <MenuItem>
          <ProfileDialogPassword setAnchorEl={setAnchorEl} />
        </MenuItem>
        <Divider />
        <MenuItem>
          <ProfileMenuItem
            handleFunction={logout}
            icon={<Logout fontSize="small" />}
            text="ログアウト"
          />
        </MenuItem>
      </Menu>
    </div>
  )
}
