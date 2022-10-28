import { Box, Button, TextField } from '@mui/material'
import { usePost } from 'Hooks/usePost'
import { Alert } from 'Templates/Form/Alert'
import { ImagePreview } from 'Templates/Post/ImagePreview'
import { PeriodSelect } from 'Templates/Post/PeriodSelect'
import { PrefectureSelect } from 'Templates/Post/PrefectureSelect'

interface Props {
  loading?: boolean
}

export const PostForm = ({ loading = false }: Props) => {
  const { latlng, errorMessage, file, setErrorMessage, setFile, handleSubmit } = usePost(loading)

  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        p: 6
      }}
      onSubmit={handleSubmit}
    >
      <Alert errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
      <TextField fullWidth label="タイトル" name="title" autoFocus />
      <TextField type="number" value={latlng?.lat()} name="lat" sx={{ display: 'none' }} />
      <TextField type="number" value={latlng?.lng()} name="lng" sx={{ display: 'none' }} />
      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-around w-48">
          <PrefectureSelect />
          <PeriodSelect />
        </div>
        <ImagePreview file={file} setFile={setFile} />
      </div>
      <TextField fullWidth label="説明" name="content" multiline rows={8} />
      <Button type="submit" variant="contained" sx={{ alignSelf: 'flex-end', width: '100px', mt: 2 }}>
        作成
      </Button>
    </Box>
  )
}
