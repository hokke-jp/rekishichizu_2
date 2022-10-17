import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useLogin } from 'Hooks/useLogin'
import { EmailInput } from 'Parts/EmailInput'
import { FormButton } from 'Parts/FormButton'
import { FormTitle } from 'Parts/FormTitle'
import { PasswordInput } from 'Parts/PasswordInput'
import { Alert } from 'Templates/Form/Alert'
import { Link } from 'Templates/Form/Link'

export const LoginForm = () => {
  const { errorMessage, setErrorMessage, handleLogin } = useLogin()

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          rowGap: 4
        }}
      >
        <FormTitle text="ログイン" />
        <Alert errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
        <Box
          component="form"
          onSubmit={handleLogin}
          noValidate
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3
          }}
        >
          <EmailInput autoFocus />
          <PasswordInput />
          <FormButton text="ログイン" />
        </Box>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <Link to="/createAccount" text="アカウントを作成する" />
        </Box>
      </Box>
    </Container>
  )
}
