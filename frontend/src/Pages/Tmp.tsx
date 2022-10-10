import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

export const Tmp = () => {
  const [count, setCount] = useState(0)
  const [nums, setNums] = useState<number[]>([])
  const handleNum = () => {
    setNums([1, 2, 3])
  }
  const handleNums = (index: number) => {
    setNums(nums.map((num, i) => (i === index ? 100 : num)))
  }
  console.log('呼ばれた')

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
  const location = useLocation()

  const [hello, setHello] = useState('よろしく')

  return (
    <div className="">
      JSON : {JSON.stringify(nums)} <br />
      input : <input type="text" value={nums.toString()} />
      <button onClick={handleNum}>btn</button>
      <button onClick={() => handleNums(0)}>btn</button>
      <p>count : {count}</p>
      <p>location : {JSON.stringify(location)}</p>
      <div>
        <button className="px-4 py-2 bg-yellow-200 border" onClick={() => setCount((p) => p + 1)}>
          +
        </button>
      </div>
      <button className="block px-8 py-4 bg-blue-200 mb-5" onClick={handleCreate}>
        作成
      </button>
      <button className="block px-8 py-4 bg-blue-200 mb-5" onClick={handleChange}>
        変更
      </button>
      <button className="block px-8 py-4 bg-blue-200" onClick={handleDelete}>
        デリート
      </button>
      <button className="block px-8 py-4 bg-blue-200" onClick={() => setHello('よろしく')}>
        {hello}
      </button>
    </div>
  )
}
