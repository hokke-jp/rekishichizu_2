import { Skeleton } from '@mui/material'

export const UserListSkeletonElement = () => {
  return (
    <div className="flex gap-x-3 items-center p-3">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="text" sx={{ flexGrow: 1, fontSize: 24 }} />
    </div>
  )
}
