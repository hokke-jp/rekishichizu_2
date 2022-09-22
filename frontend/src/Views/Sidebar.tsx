import { SidebarIcons } from 'Templates/SidebarIcons'
import { SidebarLayout } from 'Templates/SidebarLayout'
import { SidebarLoggedinIcons } from 'Templates/SidebarLoggedinIcons'
import { useCurrentUserContext } from 'Utils/CurrentUserContext'

export const Sidebar = () => {
  const { currentUser } = useCurrentUserContext()
  return (
    <SidebarLayout
      icons={
        currentUser ? (
          <SidebarLoggedinIcons user={currentUser} />
        ) : (
          <SidebarIcons />
        )
      }
    />
  )
}
