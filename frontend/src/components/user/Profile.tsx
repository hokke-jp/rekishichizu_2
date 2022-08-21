import { Button, ButtonBase } from '@mui/material'

export const Profile = () => {
  return (
    <div>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        ログイン
      </Button>
      <ButtonBase>
        <p className="bg-blue-200">テスト</p>
      </ButtonBase>
    </div>
  )
}
