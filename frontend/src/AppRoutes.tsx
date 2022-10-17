import { CreateAccount } from 'Pages/CreateAccount'
import { Home } from 'Pages/Home'
import { Layout } from 'Pages/Layout'
import { Login } from 'Pages/Login'
import { Post } from 'Pages/Post'
import { Profile } from 'Pages/Profile'
import { AuthenticatedGuard } from 'Utils/AuthenticatedGuard'
import { AuthenticatedRoute } from 'Utils/AuthenticatedRoute'
import { NotFound } from 'Views/NotFound'
import { Routes, Route } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<AuthenticatedGuard component={<Login />} />} />
        <Route path="createAccount" element={<AuthenticatedGuard component={<CreateAccount />} />} />
        <Route path="post" element={<AuthenticatedRoute component={<Post />} />} />
        <Route path=":userName" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
