import { Modal, Skeleton } from '@mui/material'
import { useState } from 'react'

export const SkeletonCard = () => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  return (
    <>
      <li className="w-52 min-h-[256px] border rounded-md shadow-md overflow-hidden" onDoubleClick={handleOpen}>
        <Skeleton variant="rectangular" height={128} />
        <div className="pt-3 px-3">
          <Skeleton />
          <Skeleton width="60%" />
          <div className="flex items-center pt-3 gap-1">
            <Skeleton variant="circular" width={40} height={40} />
            <div className="grow">
              <Skeleton width="100%" />
              <div className="flex items-center justify-between">
                <Skeleton width="60%" />
                <div className="flex items-center">
                  <Skeleton variant="circular" width={20} height={20} />
                  <Skeleton width={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex w-4/5 h-4/5 bg-white outline-none rounded-xl">
          <Skeleton variant="rectangular" width="40%" height="100%" />
          <div className="grow pt-3 px-8">
            <div className="flex items-center gap-2 mb-6">
              <Skeleton variant="circular" width={40} height={40} />
              <div className="grow">
                <Skeleton width="60%" />
              </div>
            </div>
            <div className="mb-3">
              <Skeleton width="100%" sx={{ fontSize: '2rem' }} />
              <Skeleton width="60%" sx={{ fontSize: '2rem' }} />
            </div>
            <div className="flex gap-x-2">
              <Skeleton variant="rectangular" width={60} height={30} />
              <Skeleton variant="rectangular" width={60} height={30} />
            </div>
            <div className="flex items-center justify-between mb-3">
              <Skeleton width="30%" sx={{ fontSize: '0.5rem' }} />
              <div className="flex items-center">
                <Skeleton variant="circular" width={30} height={30} />
                <Skeleton width={20} />
              </div>
            </div>
            <div>
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="60%" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
