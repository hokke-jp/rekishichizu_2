import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { useFetchArticleOptionsContext } from 'Utils/FetchArticleOptionsContext'
import { useSearchQueriesContext } from 'Utils/SearchQueriesContext'
import { axiosInstance } from 'Utils/axios'

export const useArticles = () => {
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()
  const { setArticles } = useArticlesContext()
  const { setFetchArticleOptions } = useFetchArticleOptionsContext()
  const { searchQueries } = useSearchQueriesContext()

  const fetchArticles = (page: number) => {
    return axiosInstance
      .get('/articles', { params: { page, ...searchQueries } })
      .then((response) => {
        const data = response.data
        if (data.length === 0) {
          setFetchArticleOptions((prev) => ({ ...prev, hasMore: false }))
          return
        }
        setArticles((prev) => {
          const prevIds = prev.map((pre) => pre.id)
          const newData = data.filter((d: { id: number }) => !prevIds.includes(d.id))
          return [...prev, ...newData]
        })
        setFetchArticleOptions((prev) => ({ ...prev, isLoading: false }))
      })
      .catch((error) => {
        console.log(error)
        setAlertSeverity('error')
        setAlertMessage('通信に失敗しました')
      })
  }

  return { fetchArticles }
}
