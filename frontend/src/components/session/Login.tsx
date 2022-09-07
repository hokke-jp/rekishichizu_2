// import { axiosInstance } from '../../utils/axios'
import { CurrentUserContext } from '../user/CurrentUserContext'
import { loginWithInput } from './loginWithInput'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  Alert,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from '@mui/material'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
// import Cookies from 'js-cookie'
import { FormEvent, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

// import FormControlLabel from '@mui/material/FormControlLabel'
// import Checkbox from '@mui/material/Checkbox'

const theme = createTheme()

export const Login = () => {
  // 入力情報送信機能
  const { setCurrentUser } = useContext(CurrentUserContext)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    loginWithInput({
      email: data.get('email')?.toString(),
      password: data.get('password')?.toString()
    })
      .then((response) => {
        setCurrentUser(response.data.data)
        navigate(`/`)
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage('メールアドレスもしくはパスワードに誤りがあります')
      })
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          {errorMessage ? (
            <Alert
              onClose={() => {
                setErrorMessage('')
              }}
              severity="error"
              sx={{ mt: 2, alignItems: 'center' }}
            >
              {errorMessage}
            </Alert>
          ) : null}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <FormControl sx={{ width: '100%' }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                パスワード *
              </InputLabel>
              <OutlinedInput
                required
                fullWidth
                name="password"
                type={values.showPassword ? 'text' : 'password'}
                id="outlined-adornment-password"
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
                label="パスワード"
              />
            </FormControl>
            {/* <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" size="small" />
              }
              label="ログイン状態を保存する"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
            <Grid container justifyContent="flex-end">
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  パスワードを忘れた
                </Link>
              </Grid> */}
              <Grid item>
                <NavLink to="/createAccount" className={'text-blue-600'}>
                  アカウントを作成する
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
        ></svg>
      </div>
    </ThemeProvider>
  )
}
