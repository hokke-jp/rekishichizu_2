import { AddPhotoAlternateOutlined } from '@mui/icons-material'
import CancelIcon from '@mui/icons-material/Cancel'
import { ButtonBase } from '@mui/material'
import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useState, useEffect, Dispatch } from 'react'

interface Props {
  file: File | null
  setFile: Dispatch<File | null>
}

export const ImagePreview = ({ file, setFile }: Props) => {
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const [url, setUrl] = useState<string>('')
  useEffect(() => {
    if (!file) return
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
    const file = event.target?.files
    if (file && file[0]) {
      const sizeInMegabytes = file[0].size / 1024 / 1024
      if (sizeInMegabytes > 5) {
        setAlertMessage('5MB以下のファイルを選択してください')
        setAlertSeverity('warning')
        return
      }
      setFile(file[0])
    }
  }
  const resetFile = () => {
    setFile(null)
  }

  return (
    <div className="relative">
      <ButtonBase
        style={{
          display: 'block',
          width: '100%'
        }}
      >
        <label
          htmlFor="image"
          className="flex justify-center items-center w-72 h-48 ml-auto bg-gray-200 border-[3px] border-dashed border-gray-300 rounded-md hover:opacity-80 hover:cursor-pointer"
        >
          <input type="file" id="image" accept="image/jpeg,image/png" onChange={handleFile} hidden />
          {file ? (
            <img src={url} alt={file.name} className="object-contain max-w-full max-h-full" />
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
