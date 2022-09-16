import { axiosInstance } from '../../utils/axios'
import { getToken } from '../session/getToken'
import { setCookie } from '../session/handleCookie'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react'

export const EditEmailDialog = ({
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
  const tokens = getToken()
  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    ;(async () => {
      return await axiosInstance
        .patch(
          '/auth',
          { email: data.get('email') },
          {
            headers: {
              'Content-Type': 'application/json',
              ...tokens
            }
          }
        )
        .then((response) => {
          const keysAndValues = [
            { key: 'uid', value: response.headers.uid },
            { key: 'client', value: response.headers.client },
            { key: 'access-token', value: response.headers['access-token'] }
          ]
          setCookie(keysAndValues)
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
        <DialogTitle sx={{ pb: 0 }}>メールアドレス変更</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate}>
          <DialogContent>
            <DialogContentText>
              現在のメールアドレス : {tokens.uid}
            </DialogContentText>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="新しいメールアドレス"
              type="email"
              variant="standard"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>キャンセル</Button>
            <Button variant="contained" type="submit">
              更新
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
