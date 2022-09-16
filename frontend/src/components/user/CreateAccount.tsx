import { axiosInstance } from '../../utils/axios'
import { removeCookie, setCookie } from '../session/handleCookie'
import { CurrentUserContext } from './CurrentUserContext'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material'
import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FormEvent, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const theme = createTheme()
export const CreateAccount = () => {
  // 入力情報送信機能
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { setCurrentUser } = useContext(CurrentUserContext)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setErrorMessage('')
    ;(async () => {
      return await axiosInstance
        .post('/auth', {
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password')
        })
        .then((response) => {
          const keysAndValues = [
            { key: 'uid', value: response.headers.uid },
            { key: 'client', value: response.headers.client },
            { key: 'access-token', value: response.headers['access-token'] }
          ]
          setCookie(keysAndValues)
          setCurrentUser(response.data.data)
          navigate(`/${response.data.data.name}`)
        })
        .catch((error) => {
          console.error(error)
          removeCookie(['uid', 'client', 'access-token'])
          console.log(error)
          setErrorMessage(error.response.data.errors.full_messages.join('\n'))
        })
    })()
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
  const handleChange =
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
            アカウント作成
          </Typography>
          {errorMessage ? (
            <Alert
              onClose={() => {
                setErrorMessage('')
              }}
              severity="error"
              sx={{ mt: 2, alignItems: 'center' }}
              style={{ whiteSpace: 'pre-wrap' }}
            >
              {errorMessage}
            </Alert>
          ) : null}
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="ユーザー名(他のユーザーに公開されます)"
                  name="name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="メールアドレス"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
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
                    autoComplete="new-password"
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="パスワード"
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              作成する
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <NavLink to="/login" className={'text-blue-600'}>
                  ログイン画面へ
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
