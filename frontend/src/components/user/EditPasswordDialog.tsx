import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Box,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { axiosInstance } from 'Utils/axios'
import { getToken, setCookie } from 'components/session/handleCookie'
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react'

export const EditPasswordDialog = ({
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
  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const tokens = getToken()
    const data = new FormData(event.currentTarget)
    ;(async () => {
      return await axiosInstance
        .patch(
          '/auth',
          { password: data.get('password') },
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
    })()
    setOpen(false)
    setAnchorEl(null)
  }
  // パスワード表示切り替え機能
  interface State {
    amount: string
    password: string
    weight: string
    weightRange: string
    showPassword: boolean
  }
  const [values, setValues] = useState<State>({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false
  })
  const handleClick =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value })
    }
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword
    })
  }
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <>
      <button className="flex items-center" onClick={handleOpen}>
        {children}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ pb: 0 }}>パスワード変更</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate}>
          <DialogContent>
            <DialogContentText>
              新しいパスワードを入力してください。
            </DialogContentText>
            <FormControl sx={{ width: '100%', mt: 2 }} variant="standard">
              <InputLabel>パスワード</InputLabel>
              <Input
                fullWidth
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleClick('password')}
                autoFocus
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
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
