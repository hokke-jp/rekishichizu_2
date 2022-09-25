import { Edit } from '@mui/icons-material'
import { Box, TextField, Grid, Button, Tooltip } from '@mui/material'
import { useUpdate } from 'Hooks/useUpdate'
import { Introduction } from 'Templates/Profile/Introduction'
import { useState } from 'react'

export const EditableIntroduction = () => {
  const { currentUser, open, handleOpen, handleClose, update } = useUpdate()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const user = currentUser!
  const [newIntroduction, setNewIntroduction] = useState(user.introduction)

  return (
    <>
      {open ? (
        <Box component="form" onSubmit={update}>
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
              <Button onClick={handleClose}>キャンセル</Button>
            </Grid>
            <Grid item>
              <Button variant="contained" type="submit">
                更新
              </Button>
            </Grid>
          </Grid>
        </Box>
      ) : (
        <Tooltip title={<Edit onClick={handleOpen} fontSize="small" />} placement="right">
          <div onDoubleClick={handleOpen} className="inline-block">
            <Introduction introduction={user.introduction} />
          </div>
        </Tooltip>
      )}
    </>
  )
}
