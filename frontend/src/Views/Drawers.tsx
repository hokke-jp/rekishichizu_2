import { SearchDrawer } from './SearchDrawer'
import { useArticles } from 'Hooks/useArticles'
import { useMap } from 'Hooks/useMap'
import { ArticlesDrawer } from 'Views/ArticlesDrawer'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const Drawers = () => {
  const { fetchArticles } = useArticles()
  const location = useLocation()
  useMap()
  useEffect(() => {
    fetchArticles(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state])

  return (
    <>
      <ArticlesDrawer />
      <SearchDrawer />
    </>
  )
}
