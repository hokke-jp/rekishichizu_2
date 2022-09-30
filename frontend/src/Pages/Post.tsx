import { Map } from 'Views/Map'
import { PostForm } from 'Views/PostForm'

export const Post = () => {
  return (
    <div className="flex">
      <PostForm />
      <div className="w-1/2 h-screen bg-gray-200">
        <Map />
      </div>
    </div>
  )
}
