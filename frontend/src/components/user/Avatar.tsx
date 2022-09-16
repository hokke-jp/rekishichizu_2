import DefaultUserImage from '../../images/default_user_image.jpg'

export const Avatar = ({
  url,
  className
}: {
  url: string | null | undefined
  className: string
}) => {
  return (
    <>
      {url ? (
        <img
          src={url}
          alt="User avatar"
          className={className.concat(' object-cover')}
        />
      ) : (
        <img src={DefaultUserImage} alt="User avatar" className={className} />
      )}
    </>
  )
}
