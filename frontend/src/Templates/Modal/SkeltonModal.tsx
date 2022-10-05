import { Modal, Skeleton } from '@mui/material'

export const SkeltonModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  return (
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
            <Skeleton width="30%" />
            <Skeleton width="100%" />
            <Skeleton width="70%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="100%" />
            <Skeleton width="60%" />
          </div>
        </div>
      </div>
    </Modal>
  )
}
