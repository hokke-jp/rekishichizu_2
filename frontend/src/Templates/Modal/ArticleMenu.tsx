import { DialogDelete } from './DialogDelete'
// import { DialogEdit } from './DialogEdit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { Article } from 'Utils/Types'
import { MouseEvent, useState } from 'react'

interface Props {
  article: Article
}

export const ArticleMenu = ({ article }: Props) => {
  const { currentUser } = useCurrentUserContext()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return currentUser && currentUser.article_ids?.includes(article.id) ? (
    <div className="fixed top-2 right-2">
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <MoreHorizIcon sx={{ width: 32, height: 32 }}></MoreHorizIcon>
      </IconButton>
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
        {/* <MenuItem>
          <DialogEdit setAnchorEl={setAnchorEl} />
        </MenuItem> */}
        <MenuItem>
          <DialogDelete setAnchorEl={setAnchorEl} article={article} />
        </MenuItem>
      </Menu>
    </div>
  ) : null
}
