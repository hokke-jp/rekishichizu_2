import { Icons } from 'Templates/Sidebar/Icons'
import { LoggedinIcons } from 'Templates/Sidebar/LoggedinIcons'
import { SidebarLayout } from 'Templates/Sidebar/SidebarLayout'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'

export const Sidebar = () => {
  const { currentUser } = useCurrentUserContext()
  return <SidebarLayout icons={currentUser ? <LoggedinIcons user={currentUser} /> : <Icons />} />
}
