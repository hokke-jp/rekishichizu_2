import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import { IconButton, Skeleton } from '@mui/material'
import { CardLayout } from 'Templates/Card/CardLayout'

export const SkeletonCard = () => {
  return (
    <CardLayout
      image={<Skeleton variant="rectangular" height={128} />}
      title={
        <>
          <Skeleton variant="text" sx={{ fontSize: 14 }} />
          <Skeleton variant="text" sx={{ fontSize: 14 }} width="60%" />
        </>
      }
      avatar={<Skeleton variant="circular" width={40} height={40} />}
      userName={<Skeleton width="100%" variant="text" sx={{ fontSize: 13 }} />}
      createdTime={<Skeleton width="60%" variant="text" sx={{ fontSize: 13 }} />}
      like={
        <>
          <IconButton aria-label="like" size="small" disabled>
            <ThumbUpOutlinedIcon color="primary" sx={{ fontSize: 20 }} />
          </IconButton>
          <Skeleton width={20} />
        </>
      }
    />
  )
}
