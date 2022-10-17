import NoImage from 'Images/no_image.jpg'

export const Image = ({ url, className }: { url: string | undefined; className: string }) => {
  return url ? (
    <img src={url} alt="Article Image" className={className.concat(' object-cover')} />
  ) : (
    <img src={NoImage} alt="No Image" className={className.concat(' object-cover')} />
  )
}
