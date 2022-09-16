import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton
} from '@mui/material'
import { useState } from 'react'

export const PasswordInput = () => {
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
        label="パスワード"
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
  )
}
