import { Routes, Route } from 'react-router-dom'
import { Map } from './Map'
import { Page2 } from './page2'
import { Page1Child } from './page1Child'
import { Posts } from './posts'
import { Notfound } from './Notfound'
import { Layout } from './Layout'

const App = () => {
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

  return (
    // <div className='flex flex-row-reverse'>
    //   <GlobalNav />
    //   <div className='grow'>
    //     <div className='h-screen bg-slate-400'>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Map />} />
        <Route path="posts" element={<Posts />}>
          <Route path="page1Child" element={<Page1Child />} />
        </Route>
        <Route path="page2" element={<Page2 />} />
      </Route>
      <Route path="*" element={<Notfound />} />
    </Routes>
    //     </div>
    //   </div>
    // </div>
  )
}

export default App
