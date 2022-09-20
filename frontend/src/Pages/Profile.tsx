import { CircularProgress } from '@mui/material'
import { useProfile } from 'Hooks/useProfile'
import { MyProfile } from 'Views/MyProfile'
import { UserProfile } from 'Views/UserProfile'
import { Notfound } from 'components/Notfound'

export const Profile = () => {
  const { isLoading, isMypage, user } = useProfile()

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-full">
          <CircularProgress size={68} />
        </div>
      ) : (
        <>
          {user ? (
            <>{isMypage ? <MyProfile /> : <UserProfile user={user} />}</>
          ) : (
            <Notfound />
          )}
        </>
      )}
    </>
  )
}
