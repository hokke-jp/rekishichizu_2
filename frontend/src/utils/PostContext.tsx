import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

const PostContext = createContext({
  prefectureId: '',
  periodId: ''
} as {
  prefectureId: number | ''
  periodId: number | ''
  setPrefectureId: Dispatch<SetStateAction<number | ''>>
  setPeriodId: Dispatch<SetStateAction<number | ''>>
})

export const usePostContext = () => {
  return useContext(PostContext)
}

export const PostContextProvider = ({ children }: { children: ReactNode }) => {
  const [prefectureId, setPrefectureId] = useState<number | ''>('')
  const [periodId, setPeriodId] = useState<number | ''>('')
  const value = {
    prefectureId,
    periodId,
    setPrefectureId,
    setPeriodId
  }

  return <PostContext.Provider value={value}>{children}</PostContext.Provider>
}
