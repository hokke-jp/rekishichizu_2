import { CreateAccount } from 'Pages/CreateAccount'
import { Home } from 'Pages/Home'
import { Layout } from 'Pages/Layout'
import { Login } from 'Pages/Login'
import { Profile } from 'Pages/Profile'
import { Posts } from 'Pages/posts'
import { NotFound } from 'Views/NotFound'
import { Routes, Route } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<Posts />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="createAccount" element={<CreateAccount />}></Route>
        <Route path=":userName" element={<Profile />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
