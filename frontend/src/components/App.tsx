import { Layout } from 'components/Layout'
import { Notfound } from 'components/Notfound'
import { Map } from 'components/map/Map'
import { Posts } from 'components/posts'
import { Login } from 'components/session/Login'
import { loginWithCookie } from 'components/session/session'
import { CreateAccount } from 'components/user/CreateAccount'
import { CurrentUserContext } from 'components/user/CurrentUserContext'
import type { User } from 'components/user/CurrentUserContext'
import { Profile } from 'components/user/Profile'
import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'

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
  // display → welcomDisplay / textcss → welcomText

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const token = Cookies.get('access-token')
  useEffect(() => {
    // Cookieをチェックし,トークンがあるならログインリクエストを飛ばし,ないならリターン
    if (!token) return
    loginWithCookie()
      .then((response) => {
        setCurrentUser(response.data)
      })
      .catch((error) => {
        console.log(error)
        setCurrentUser(null)
      })
  }, [token])

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Map />} />
          <Route path="post" element={<Posts />}></Route>
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
