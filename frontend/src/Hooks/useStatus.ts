import { useAlertMessageContext } from 'Utils/AlertMessageContext'
import { useArticlesContext } from 'Utils/ArticlesContext'
import { Article, UserInfoInArticle } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { MutableRefObject, useState } from 'react'

const scrollToElement = (element: MutableRefObject<HTMLDivElement | null>) => {
  if (element.current) {
    element.current.scrollIntoView({ behavior: 'smooth' })
  }
}

export const useStatus = () => {
  const [users, setUsers] = useState<UserInfoInArticle[]>([])
  const [duringFetchData, setDuringFetchData] = useState<'article' | 'user' | null>(null)
  const [nowLoading, setNowLoading] = useState(true)
  const [skeletonNumber, setSkeletonNumber] = useState(0)
  const { articles, setArticles } = useArticlesContext()
  const { setAlertMessage, setAlertSeverity } = useAlertMessageContext()

  const updateLikedUserIds = (updateArticleId: number, newLikedUserIds: number[]): void => {
    setArticles(
      articles.map((article: Article): Article => {
        return article.id === updateArticleId ? { ...article, liked_user_ids: newLikedUserIds } : article
      })
    )
  }

  const deleteArticleFromList = (id: number): void => {
    setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id))
  }

  const fetchArticles = (ids: number[] | undefined, ref: MutableRefObject<HTMLDivElement | null>) => {
    if (typeof ids === 'undefined' || !ids.length) {
      setDuringFetchData(null)
      return
    }
    setSkeletonNumber(ids?.length || 0)
    setDuringFetchData('article')
    setNowLoading(true)
    axiosInstance
      .get('/articles', { params: { ids: `${ids}` } })
      .then((response) => {
        setArticles(response.data)
        scrollToElement(ref)
      })
      .catch((error) => {
        console.error(error)
        setAlertSeverity('error')
        setAlertMessage('通信に失敗しました')
      })
      .finally(() => setNowLoading(false))
  }

  const fetchUsers = (ids: number[] | undefined, ref: MutableRefObject<HTMLDivElement | null>) => {
    if (typeof ids === 'undefined' || !ids.length) {
      setDuringFetchData(null)
      return
    }
    setSkeletonNumber(ids?.length || 0)
    setDuringFetchData('user')
    setNowLoading(true)
    axiosInstance
      .get(`/users`, { params: { ids: `${ids}` } })
      .then((response) => {
        setUsers(response.data.users as UserInfoInArticle[])
        scrollToElement(ref)
      })
      .catch((error) => {
        console.error(error)
        setAlertSeverity('error')
        setAlertMessage('通信に失敗しました')
      })
      .finally(() => setNowLoading(false))
  }

  return {
    duringFetchData,
    setDuringFetchData,
    nowLoading,
    skeletonNumber,
    users,
    updateLikedUserIds,
    deleteArticleFromList,
    fetchArticles,
    fetchUsers
  }
}
