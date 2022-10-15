import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { axiosInstance } from 'Utils/axios'

export const useArticles = () => {
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const { setHasMore } = useArticlesContext()
  const { options, setArticles, setOptions } = useArticlesContext()

  const fetchArticles = (page: number) => {
    return axiosInstance
      .get('/articles', { params: { page, ...options } })
      .then((response) => {
        const data = response.data
        if (data.length === 0) {
          setHasMore(false)
          return
        }
        setArticles((prev) => [...prev, ...data])
      })
      .catch((error) => {
        console.log(error)
        setAlertSeverity('error')
        setAlertMessage('通信に失敗しました')
      })
  }

  const resetOptions = () => {
    setOptions({
      words: '',
      period_ids: '',
      prefecture_ids: '',
      sort_by: 'created_at DESC'
    })
  }

  return { fetchArticles, resetOptions }
}
