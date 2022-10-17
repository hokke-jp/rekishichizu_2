import { AppProvider } from 'AppProvider'
import { AppRoutes } from 'AppRoutes'

export const App = () => {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  )
}
