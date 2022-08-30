import { axiosInstance } from '../../utils/axios'
import { CurrentUserContext } from './CurrentUserContext'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
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
import Cookies from 'js-cookie'
import { FormEvent, useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const theme = createTheme()
export const CreateAccount = () => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const { setCurrentUser } = useContext(CurrentUserContext)
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    ;(async () => {
      setErrorMessage('')
      return await axiosInstance
        .post('/auth', {
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password')
        })
        .then((response) => {
          Cookies.set('uid', response.headers.uid)
          Cookies.set('client', response.headers.client)
          Cookies.set('access-token', response.headers['access-token'])
          setCurrentUser(response.data.data)
          navigate(`/${response.data.data.name}`)
        })
        .catch((error) => {
          console.error(error)
          Cookies.remove('uid')
          Cookies.remove('client')
          Cookies.remove('access-token')
          setErrorMessage(error.response.data.errors.full_messages.join('\n'))
        })
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
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="パスワード"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
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
