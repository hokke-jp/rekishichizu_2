import NoImage from 'Images/no_image.jpg'

export const Image = ({ url, className = undefined }: { url: string | null | undefined; className?: string }) => {
  return (
    <>
      {url ? (
        <img src={url} alt="User avatar" className={className?.concat(' object-cover')} />
      ) : (
        <img src={NoImage} alt="User avatar" className={className?.concat(' object-cover')} />
      )}
    </>
  )
}
