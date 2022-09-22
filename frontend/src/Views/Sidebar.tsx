import { Icons } from 'Templates/Sidebar/Icons'
import { Layout } from 'Templates/Sidebar/Layout'
import { LoggedinIcons } from 'Templates/Sidebar/LoggedinIcons'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'

export const Sidebar = () => {
  const { currentUser } = useCurrentUserContext()
  return (
    <Layout
      icons={currentUser ? <LoggedinIcons user={currentUser} /> : <Icons />}
    />
  )
}
