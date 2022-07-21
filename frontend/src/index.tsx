import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import App from './App';
import { Home } from './Home'
import { Page1 } from './page1'
import { Page2 } from './page2'
import { Page3 } from './page3'
import { Page1Child } from './page1Child'
import { Posts } from './posts';
import { Layout } from './Layout'
import { Notfound } from './Notfound'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='posts' element={<Posts />} />
          <Route path='page1' element={<Layout />}>
            <Route index element={<Page1 />} />
            <Route path='page1Child' element={<Page1Child />} />
          </Route>
          <Route path='page2' element={<Page2 />} />
        </Route>
        <Route path='page3' element={<Page3 />} />
        <Route path="*" element={<Notfound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
