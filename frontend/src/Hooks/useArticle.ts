import { useArticlesContext } from 'Utils/ArticlesContext'
import { Article, UserInList } from 'Utils/Types'
import { axiosInstance } from 'Utils/axios'
import { MutableRefObject, useState } from 'react'

const scrollToElement = (ref: MutableRefObject<HTMLDivElement | null>) => {
  if (ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' })
  }
}

export const useArticle = () => {
  const { articles, setArticles, setModalOpens } = useArticlesContext()
  const [users, setUsers] = useState<UserInList[]>([])
  const [duringFetchData, setDuringFetchData] = useState<'article' | 'user' | null>(null)
  const [nowLoading, setNowLoading] = useState(true)
  const [skeletonNumber, setSkeletonNumber] = useState(0)

  const updateLikedUserIds = (updateArticleId: number, newLikedUserIds: number[]): void => {
    setArticles(
      articles.map((article: Article): Article => {
        return article.id === updateArticleId ? { ...article, liked_user_ids: newLikedUserIds } : article
      })
    )
  }

  const deleteArticleFromList = (id: number): void => {
    setArticles((prevArticles) => prevArticles.filter((article: Article) => article.id !== id))
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
      .get(`/articles`, { params: { ids: `${ids}` } })
      .then((response) => {
        const articles = response.data
        setArticles(articles as Article[])
        const nums = articles.length
        setModalOpens([...Array(nums)].map(() => false))
        scrollToElement(ref)
      })
      .catch((error) => {
        console.error(error)
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
        setUsers(response.data.users as UserInList[])
        scrollToElement(ref)
      })
      .catch((error) => {
        console.error(error)
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
