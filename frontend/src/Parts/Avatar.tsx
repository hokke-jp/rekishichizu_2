import DefaultUserImage from 'Images/default_user_image.jpg'

export const Avatar = ({ url, className = undefined }: { url: string | null | undefined; className?: string }) => {
  return (
    <>
      {url ? (
        <img src={url} alt="User avatar" className={className?.concat(' object-cover')} />
      ) : (
        <img src={DefaultUserImage} alt="User avatar" className={className} />
      )}
    </>
  )
}
