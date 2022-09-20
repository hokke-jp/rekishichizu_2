import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { EmailInput } from 'Parts/EmailInput'
import { axiosInstance } from 'Utils/axios'
import { getToken, setCookie } from 'components/session/handleCookie'
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react'

export const EditEmailDialog = ({
  children,
  setAnchorEl
}: {
  children: ReactNode
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
}) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => {
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
    axiosInstance
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
        const headers = response.headers
        setCookie([headers.uid, headers.client, headers['access-token']])
      })
      .catch((error) => {
        console.error(error.response.data)
      })
    setOpen(false)
    setAnchorEl(null)
  }

  return (
    <>
      <button className="flex items-center" onClick={handleOpen}>
        {children}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>メールアドレス変更</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate}>
          <DialogContent>
            <DialogContentText>
              現在のメールアドレス : {tokens.uid}
            </DialogContentText>
            <EmailInput autoFocus />
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
