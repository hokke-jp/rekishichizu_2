import { ArticleCard } from 'Templates/Card/ArticleCard'
import { SkeletonCard } from 'Templates/Card/SkeletonCard'
import { useArticlesContext } from 'Utils/ArticlesContext'

export const ArticlesDrawer = () => {
  const { isLoading, articles } = useArticlesContext()

  return (
    <>
      <input type="checkbox" defaultChecked={true} id="articles-drawer-checkbox" hidden />
      <div
        id="articles-drawer-div"
        className="flex h-screen rounded-tr-3xl rounded-br-3xl bg-white shadow-md shadow-gray-300 overflow-hidden"
      >
        <ul className="grow flex flex-col items-center gap-y-10 h-screen pt-10 pb-10 overflow-auto">
          {isLoading
            ? [...Array(3)].map((v, i) => (
                <li key={i}>
                  <SkeletonCard />
                </li>
              ))
            : articles.map((article) => (
                <li key={article.id}>
                  <ArticleCard article={article} />
                </li>
              ))}
        </ul>
        <label
          id="articles-drawer-label"
          htmlFor="articles-drawer-checkbox"
          className="block relative h-screen w-12 hover:bg-gray-100"
        >
          <span className="absolute top-1/2 right-3 w-1 h-8 bg-gray-300 rounded-lg"></span>
        </label>
      </div>
    </>
  )
}
