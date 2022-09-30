import { CreateAccount } from 'Pages/CreateAccount'
import { Home } from 'Pages/Home'
import { Layout } from 'Pages/Layout'
import { Login } from 'Pages/Login'
import { Post } from 'Pages/Post'
import { Profile } from 'Pages/Profile'
import { Tmp } from 'Pages/Tmp'
import { NotFound } from 'Views/NotFound'
import { Routes, Route } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="post" element={<Post />}></Route>
        <Route path="tmp" element={<Tmp />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="createAccount" element={<CreateAccount />}></Route>
        <Route path=":userName" element={<Profile />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
