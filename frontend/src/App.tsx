import logo from './img/app_logo.png'
import { Outlet, Link } from 'react-router-dom'

const App = () => {
  return (
    <div className="m-10">
      <header className='flex justify-around items-center'>
        <Link to="/">
          <img src={logo} className="inline-block rounded-2xl" alt="logo" width={150}/>
        </Link>
        <Link className='text-2xl' to="/posts">記事一覧</Link> |{' '}
        <Link to="/page1">page1</Link> |{' '}
        <Link to="/page2">page2</Link> |{' '}
        <Link to="/page3">page3 only</Link>
      </header>
      <div className='mt-20 text-center'><Outlet /></div>
    </div>
  )
}

export default App
