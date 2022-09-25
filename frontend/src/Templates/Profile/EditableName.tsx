import { Edit } from '@mui/icons-material'
import { Box, TextField, Button, Tooltip } from '@mui/material'
import { useUpdate } from 'Hooks/useUpdate'
import { Name } from 'Templates/Profile/Name'
import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const EditableName = () => {
  const { currentUser, open, handleOpen, handleClose, update } = useUpdate()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = currentUser!
  const [newName, setNewName] = useState(user.name)
  const navigate = useNavigate()
  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    update(event).then(() => {
      navigate(`/${newName}`)
    })
  }

  return (
    <>
      {open ? (
        <Box component="form" onSubmit={handleUpdate}>
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
          <Button onClick={handleClose}>キャンセル</Button>
          <Button variant="contained" type="submit">
            更新
          </Button>
        </Box>
      ) : (
        <Tooltip title={<Edit onClick={handleOpen} fontSize="small" />} placement="right">
          <div onDoubleClick={handleOpen} className="inline-block">
            <Name name={user.name} />
          </div>
        </Tooltip>
      )}
    </>
  )
}
