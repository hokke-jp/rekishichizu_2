import { Routes, Route } from 'react-router-dom'
import { Map } from './map/Map'
import { Posts } from './posts'
import { Notfound } from './Notfound'
import { Layout } from './Layout'
import { Login } from './session/Login'
import { CreateAccount } from './user/CreateAccount'
import { Profile } from './user/Profile'
import { CurrentUserContext } from './user/CurrentUserContext'
import type { User } from './user/CurrentUserContext'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../utils/axios'
import Cookies from 'js-cookie'

export const App = () => {
  // if (sessionStorage.getItem('isAlreadyDisplayed') === null) {
  //   sessionStorage.setItem('isAlreadyDisplayed', 'true')
  //   const display = document.createElement('div')
  //   const text = document.createElement('div')
  //   display.appendChild(text)
  //   document.body.appendChild(display)
  //   text.innerText = '歴史地図へようこそ.'
  //   display.className = 'displaycss'
  //   text.className = 'textcss'
  // }
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const token = Cookies.get('access-token')
  useEffect(() => {
    if (!token) return
    ;(async () => {
      await axiosInstance
        .get('/auth/validate_token', {
          params: {
            uid: Cookies.get('uid'),
            client: Cookies.get('client'),
            // eslint-disable-next-line no-useless-computed-key
            ['access-token']: Cookies.get('access-token')
          }
        })
        .then((response) => {
          // トークンが有効な場合
          console.log(response)
          setCurrentUser(response.data.data)
        })
        .catch((error) => {
          // トークンの期限が切れている場合
          console.error(error)
          setCurrentUser(null)
          Cookies.remove('uid')
          Cookies.remove('client')
          Cookies.remove('access-token')
        })
    })()
  }, [token])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Map />} />
          <Route path="posts" element={<Posts />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="createAccount" element={<CreateAccount />}></Route>
          {/* <Route
            path={currentUser?.name}
            element={<Profile user={currentUser} />}
          ></Route> */}
          <Route path=":userName" element={<Profile />}></Route>
        </Route>
        <Route path="*" element={<Notfound />} />
      </Routes>
    </CurrentUserContext.Provider>
  )
}
