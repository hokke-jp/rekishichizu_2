import { Edit } from '@mui/icons-material'
import { ProfileMenuItem } from 'Templates/Profile/ProfileMenuItem'
import { Dispatch, SetStateAction } from 'react'

interface Props {
  setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>
}

export const DialogEdit = ({ setAnchorEl }: Props) => {
  return (
    <>
      <ProfileMenuItem handleFunction={() => setAnchorEl(null)} icon={<Edit fontSize="small" />} text="記事編集" />
    </>
  )
}
