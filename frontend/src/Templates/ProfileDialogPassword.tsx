import { Lock } from '@mui/icons-material'
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useUpdate } from 'Hooks/useUpdate'
import { PasswordInput } from 'Parts/PasswordInput'
import { ProfileMenuItem } from 'Templates/ProfileMenuItem'
import { Dispatch, SetStateAction } from 'react'

export const ProfileDialogPassword = ({
  setAnchorEl
}: {
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
}) => {
  const { open, handleOpen, handleClose, handleUpdate } = useUpdate(setAnchorEl)

  return (
    <>
      <ProfileMenuItem
        handleFunction={handleOpen}
        icon={<Lock fontSize="small" />}
        text="パスワード"
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>パスワード変更</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate}>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              新しいパスワードを入力してください。
            </DialogContentText>
            <PasswordInput autoFocus />
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
