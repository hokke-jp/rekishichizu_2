import { CreateAccount } from 'Pages/CreateAccount'
import { Login } from 'Pages/Login'
import { Layout } from 'components/Layout'
import { Notfound } from 'components/Notfound'
import { Map } from 'components/map/Map'
import { Posts } from 'components/posts'
import { Profile } from 'components/user/Profile'
import { Routes, Route } from 'react-router-dom'

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Map />} />
        <Route path="post" element={<Posts />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="createAccount" element={<CreateAccount />}></Route>
        <Route path=":userName" element={<Profile />}></Route>
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
  )
}
