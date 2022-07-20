import logo from './images/app_logo.png';
import { Outlet, Link } from "react-router-dom";

const App = ()=> {
  return (
    <div className="m-10">
      <Link to="/">
        <img src={logo} className="inline-block rounded-2xl" alt="logo" width={200}/>
      </Link>
      <nav>
        <p className='my-10 text-2xl'><Link to="/posts">記事一覧</Link></p>
        <Link to="/page1">page1</Link> |{" "}
        <Link to="/page2">page2</Link>
      </nav>
      <p><Link to="/page3">page3 only</Link></p>
      <Outlet />
    </div>
  );
}

export default App;
