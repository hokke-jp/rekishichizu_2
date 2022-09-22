import { axiosInstance } from 'Utils/axios.js'
import { OutlinedCard } from 'Views/OutlinedCard'
import { useState, useEffect } from 'react'

interface Post {
  id: number
  created_at: Date
  updated_at: Date
  title: string
  content: string
}

export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    const f = async () => {
      const res = await axiosInstance.get('/posts')
      setPosts(res.data)
    }
    f()
  }, [])

  return (
    <div className="">
      <OutlinedCard posts={posts} />
    </div>
  )
}
