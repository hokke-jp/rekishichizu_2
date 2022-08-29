import { FormEvent, useContext } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { NavLink, useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../utils/axios'
import Cookies from 'js-cookie'
import { CurrentUserContext } from '../user/CurrentUserContext'

const theme = createTheme()

export const Login = () => {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const navigate = useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // console.log(data.get('name'))
    ;(async () => {
      await axiosInstance
        .post('/auth/sign_in', {
          email: data.get('email'),
          password: data.get('password')
        })
        .then((response) => {
          console.log(response)
          Cookies.set('uid', response.headers.uid)
          Cookies.set('client', response.headers.client)
          Cookies.set('access-token', response.headers['access-token'])
          setCurrentUser(response.data.data)
          navigate(`/posts`)
        })
        .catch((error) => console.log(error))
    })()
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={
                <Checkbox value="remember" color="primary" size="small" />
              }
              label="ログイン状態を保存する"
            />
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
