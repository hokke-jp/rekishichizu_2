import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './component/App'
import { Home } from './component/Home'
import { Page1 } from './component/page1'
import { Page2 } from './component/page2'
import { Page3 } from './component/page3'
import { Page1Child } from './component/page1Child'
import { Posts } from './component/posts'
import { Layout } from './component/Layout'
import { Notfound } from './component/Notfound'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="posts" element={<Posts />} />
          <Route path="page1" element={<Layout />}>
            <Route index element={<Page1 />} />
            <Route path="page1Child" element={<Page1Child />} />
          </Route>
          <Route path="page2" element={<Page2 />} />
        </Route>
        <Route path="page3" element={<Page3 />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
reportWebVitals()
