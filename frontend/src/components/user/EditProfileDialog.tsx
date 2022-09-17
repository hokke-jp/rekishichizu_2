import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { axiosInstance } from 'Utils/axios'
import { getToken, setCookie } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  useContext,
  useState
} from 'react'
import { useNavigate } from 'react-router-dom'

export const EditProfileDialog = ({
  children,
  setAnchorEl
}: {
  children: ReactNode
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
}) => {
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const navigate = useNavigate()
  const { setCurrentUser } = useContext(CurrentUserContext)
  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const tokens = getToken()
    const data = new FormData(event.currentTarget)
    ;(async () => {
      return await axiosInstance
        .patch(
          '/auth',
          { name: data.get('name'), introduction: data.get('introduction') },
          {
            headers: {
              'Content-Type': 'application/json',
              ...tokens
            }
          }
        )
        .then((response) => {
          const headers = response.headers
          setCookie([headers.uid, headers.client, headers['access-token']])
          setCurrentUser(response.data.data)
          navigate(`/${data.get('name')}`)
        })
        .catch((error) => {
          console.error(error.response.data)
        })
    })()
    setOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <button className="flex items-center" onClick={handleClickOpen}>
        {children}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>プロフィール更新</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate}>
          <DialogContent>
            <TextField
              margin="normal"
              fullWidth
              id="name"
              label="ユーザー名"
              type="text"
              variant="standard"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              fullWidth
              id="introduction"
              label="紹介文"
              type="text"
              variant="standard"
              name="introduction"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button type="submit">更新</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
