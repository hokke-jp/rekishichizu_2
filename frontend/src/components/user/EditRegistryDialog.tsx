import { axiosInstance } from '../../utils/axios'
import { getToken } from '../session/getToken'
import { setCookie } from '../session/handleCookie'
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
import TextField from '@mui/material/TextField'
import { Dispatch, FormEvent, ReactNode, SetStateAction, useState } from 'react'

export const EditRegistryDialog = ({
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
  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const tokens = getToken()
    const data = new FormData(event.currentTarget)
    ;(async () => {
      return await axiosInstance
        .patch(
          '/auth',
          { email: data.get('email'), password: data.get('password') },
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
      <button className="flex items-center" onClick={handleClickOpen}>
        {children}
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>登録情報更新</DialogTitle>
        <Box component="form" noValidate onSubmit={handleUpdate} sx={{ mt: 1 }}>
          <DialogContent>
            <DialogContentText>
              ご登録のメールアドレスとパスワードを変更できます。
              <br />
              新しいメールアドレス、もしくはパスワードを入力してください。
            </DialogContentText>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="メールアドレス"
              type="email"
              variant="standard"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl sx={{ width: '100%' }} variant="standard">
              <InputLabel>パスワード</InputLabel>
              <Input
                fullWidth
                id="password"
                type={values.showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleClick('password')}
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
            <Button type="submit">更新</Button>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  )
}
