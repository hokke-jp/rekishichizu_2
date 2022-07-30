import { useState } from 'react'

export const Page2 = () => {
  const [count, setCount] = useState(0)
  const handleAdd = () => {
    setCount(count + 1)
    console.log(`handleAdd: ${count}`)
  }
  console.log(`out: ${count}`)

  return (
    <div className={count % 2 === 0 ? 'bg-slate-400' : 'bg-green-400'}>
      <h2>This page is 2!</h2>
      <h2>カウント数 : {count}</h2>
      <button onClick={handleAdd} className="border px-2 rounded-md">
        +
      </button>
      <Page2Child />
    </div>
  )
}

const Page2Child = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h2>カウント数 : {count}</h2>
      <button
        onClick={() => {
          setCount(count + 2)
        }}
        className="border px-2 rounded-md"
      >
        ++
      </button>
    </div>
  )
}
