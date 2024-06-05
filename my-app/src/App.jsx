import './App.css';
import React from 'react';
import './default.css';
import './pages/backet/backet.css';
import SetData from './components/productlist/setdata';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from './pages/notfound/notfound';
import Bucket from './pages/backet/backet';
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import Addnewcard from './pages/addnewcard/addnewcard';
import ProductPage from './pages/productpage/productpage';
import './pages/addnewcard/addnewcard.css';
import './pages/productpage/productpage.css';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Outlet />}>
          <Route index element={<SetData />} /> {/*  Страница по умолчанию  */}
          <Route path="bucket" element={<Bucket />} />
          <Route path="SetData" element={<SetData />} />
          <Route path="addnew" element={<Addnewcard />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
