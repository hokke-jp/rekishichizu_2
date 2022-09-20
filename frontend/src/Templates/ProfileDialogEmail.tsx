import { ProfileMenuItem } from './ProfileMenuItem'
import { Email } from '@mui/icons-material'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useUpdate } from 'Hooks/useUpdate'
import { EmailInput } from 'Parts/EmailInput'
import { Dispatch, SetStateAction } from 'react'

export const ProfileDialogEmail = ({
  setAnchorEl
}: {
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
}) => {
  const { currentUser, open, handleOpen, handleClose, handleUpdate } =
    useUpdate(setAnchorEl)

  return (
    <>
      <ProfileMenuItem
        handleFunction={handleOpen}
        icon={<Email fontSize="small" />}
        text="メールアドレス"
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>メールアドレス変更</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate}>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              現在のメールアドレス : {currentUser?.email}
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
