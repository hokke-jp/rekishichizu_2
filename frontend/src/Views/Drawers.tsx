import { SearchDrawer } from './SearchDrawer'
import { useMap } from 'Hooks/useMap'
import { ArticlesDrawer } from 'Views/ArticlesDrawer'

export const Drawers = () => {
  useMap()

  return (
    <>
      <ArticlesDrawer />
      <SearchDrawer />
    </>
  )
}
