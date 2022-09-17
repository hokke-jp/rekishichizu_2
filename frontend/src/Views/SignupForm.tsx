import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useSignup } from 'Hooks/useSignup'
import { EmailInput } from 'Parts/EmailInput'
import { FormButton } from 'Parts/FormButton'
import { FormTitle } from 'Parts/FormTitle'
import { NameInput } from 'Parts/NameInput'
import { PasswordInput } from 'Parts/PasswordInput'
import { FormAlert } from 'Templates/FormAlert'
import { FormLink } from 'Templates/FormLink'

export const SignupForm = () => {
  const { errorMessage, setErrorMessage, handleSignup } = useSignup()

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
        <FormTitle text="アカウント作成" />
        <FormAlert
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
        <Box
          component="form"
          onSubmit={handleSignup}
          noValidate
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            rowGap: 3
          }}
        >
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <FormButton text="作成" />
        </Box>
        <Box sx={{ alignSelf: 'flex-end' }}>
          <FormLink to="/login" text="ログイン画面へ" />
        </Box>
      </Box>
    </Container>
  )
}
