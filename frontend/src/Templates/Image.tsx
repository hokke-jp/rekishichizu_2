import NoImage from 'Images/no_image.jpg'

export const Image = ({ url, className }: { url: string | null | undefined; className: string }) => {
  return (
    <>
      {url ? (
        <img src={url} alt="Article Image" className={className.concat(' object-cover')} />
      ) : (
        <img src={NoImage} alt="Article Image" className={className.concat(' object-cover')} />
      )}
    </>
  )
}
