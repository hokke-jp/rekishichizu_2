import { useAlertMessageContext } from 'Utils/AlertMessageContext'
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

  const { setAlertSeverity, setAlertMessage } = useAlertMessageContext()
  const handleDelete = () => {
    setAlertMessage('')
  }
  const handleCreate = () => {
    setAlertMessage('作成されました')
  }
  const handleChange = () => {
    const colors: ['error', 'warning', 'info', 'success'] = ['error', 'warning', 'info', 'success']
    const color = colors[Math.floor(Math.random() * 4)]
    setAlertSeverity(color)
  }

  return (
    <div className="">
      <OutlinedCard posts={posts} />

      <button className="block px-8 py-4 bg-blue-200 mb-5" onClick={handleCreate}>
        作成
      </button>
      <button className="block px-8 py-4 bg-blue-200 mb-5" onClick={handleChange}>
        変更
      </button>
      <button className="block px-8 py-4 bg-blue-200" onClick={handleDelete}>
        デリート
      </button>
    </div>
  )
}
