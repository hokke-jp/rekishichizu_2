import { Edit } from '@mui/icons-material'
import { Box, TextField, Button, Tooltip } from '@mui/material'
import { ProfileName } from 'Templates/ProfileName'
import { axiosInstance } from 'Utils/axios'
import { getToken } from 'components/session/handleCookie'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import { useState, useContext, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const ProfileEditableName = () => {
  const [isFocus, setIsFocus] = useState(false)
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = currentUser!
  const [newName, setNewName] = useState(user.name)
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
        { name: data.get('name') },
        {
          headers: {
            'Content-Type': 'application/json',
            ...tokens
          }
        }
      )
      .then((response) => {
        setCurrentUser(response.data)
        navigate(`/${data.get('name')}`)
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
            id="name"
            type="text"
            variant="standard"
            name="name"
            value={newName}
            autoFocus
            autoComplete="name"
            margin="none"
            sx={{ width: '320px' }}
            inputProps={{ style: { fontSize: 24 } }}
            onChange={(e) => setNewName(e.target.value)}
          />
          <Button onClick={() => setIsFocus(false)}>キャンセル</Button>
          <Button variant="contained" type="submit">
            更新
          </Button>
        </Box>
      ) : (
        <Tooltip
          title={<Edit onClick={handleEdit} fontSize="small" />}
          placement="right"
        >
          <div onDoubleClick={handleEdit} className="inline-block">
            <ProfileName name={user.name} />
          </div>
        </Tooltip>
      )}
    </>
  )
}
