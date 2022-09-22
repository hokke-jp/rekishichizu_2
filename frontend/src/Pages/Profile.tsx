import { CircularProgress } from '@mui/material'
import { useProfile } from 'Hooks/useProfile'
import { MyProfile } from 'Views/MyProfile'
import { NotFound } from 'Views/NotFound'
import { UserProfile } from 'Views/UserProfile'

export const Profile = () => {
  const { isLoading, isMypage, user } = useProfile()

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <CircularProgress size={68} />
        </div>
      ) : (
        <>
          {user ? (
            <>{isMypage ? <MyProfile /> : <UserProfile user={user} />}</>
          ) : (
            <NotFound />
          )}
        </>
      )}
    </>
  )
}
