import { ProfileIntroduction } from './ProfileIntroduction'
import { Edit } from '@mui/icons-material'
import { Box, TextField, Grid, Button, Tooltip } from '@mui/material'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'
import { axiosInstance } from 'Utils/axios'
import { getToken } from 'Utils/handleCookie'
import { useState, FormEvent } from 'react'

export const ProfileEditableIntroducation = () => {
  const [isFocus, setIsFocus] = useState(false)
  const { currentUser, setCurrentUser } = useCurrentUserContext()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = currentUser!
  const [newIntroduction, setNewIntroduction] = useState(user.introduction)
  const handleEdit = () => {
    setIsFocus(true)
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const tokens = getToken()
    const data = new FormData(e.currentTarget)
    axiosInstance
      .patch(
        '/auth',
        { introduction: data.get('introduction') },
        {
          headers: {
            'Content-Type': 'application/json',
            ...tokens
          }
        }
      )
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch((error) => {
        console.error(error.response.data)
      })
    setIsFocus(false)
  }
  return (
    <>
      {isFocus ? (
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            id="introduction"
            type="text"
            variant="outlined"
            name="introduction"
            value={newIntroduction || ''}
            autoFocus
            multiline
            rows={4}
            margin="none"
            fullWidth
            onChange={(e) => setNewIntroduction(e.target.value)}
          />
          <Grid container spacing={2} justifyContent="flex-end" sx={{ pt: 3 }}>
            <Grid item>
              <Button onClick={() => setIsFocus(false)}>キャンセル</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                更新
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Tooltip
          title={<Edit onClick={handleEdit} fontSize="small" />}
          placement="right"
        >
          <div onDoubleClick={handleEdit} className="inline-block">
            <ProfileIntroduction introduction={user.introduction} />
          </div>
        </Tooltip>
      )}
    </>
  )
}
