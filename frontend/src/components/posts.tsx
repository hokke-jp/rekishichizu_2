import { useState, useEffect } from 'react'
import { axiosInstance } from '../utils/axios.js'
import { OutlinedCard } from './OutlinedCard'

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
