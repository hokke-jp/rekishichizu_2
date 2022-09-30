import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import CancelIcon from '@mui/icons-material/Cancel'
import { ButtonBase, CircularProgress } from '@mui/material'
import { useState, useEffect } from 'react'

export const ImagePreview = () => {
  const [file, setFile] = useState<File | null>(null)
  const [url, setUrl] = useState<string>('')
  const isLoading = file && !url
  useEffect(() => {
    if (!file) {
      return
    }
    setUrl('')
    let reader: FileReader | null = new FileReader()
    reader.onloadend = () => {
      const res = reader?.result
      if (res && typeof res === 'string') {
        setUrl(res)
      }
    }
    reader.readAsDataURL(file)

    return () => {
      reader = null
    }
  }, [file])
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget?.files && event.currentTarget.files[0]) {
      setFile(event.currentTarget.files[0])
    }
  }
  const resetFile = () => {
    setFile(null)
  }

  return (
    <div className="relative grow">
      <ButtonBase
        style={{
          display: 'block',
          width: '100%'
        }}
      >
        <label
          htmlFor="file"
          className="flex justify-center items-center min-w-[240px] max-w-[400px] h-48 ml-auto bg-gray-200 border-[3px] border-dashed border-gray-300 rounded-md hover:opacity-80 hover:cursor-pointer"
        >
          <input type="file" id="file" accept="image/jpeg,image/png" onChange={handleFile} hidden />
          {file ? (
            isLoading ? (
              <CircularProgress size={68} />
            ) : (
              <>
                <img src={url} alt={file.name} className="object-contain max-w-full max-h-full" />
              </>
            )
          ) : (
            <AddPhotoAlternateOutlined color="action" sx={{ fontSize: 80 }} />
          )}
        </label>
      </ButtonBase>
      {file && (
        <button onClick={resetFile} className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
          <CancelIcon sx={{ color: 'error.main' }} />
        </button>
      )}
    </div>
  )
}
