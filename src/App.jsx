import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import ProductList from './components/ProductList/ProductList';
import Details from './components/Detail/Details';
import CreateProduct from './components/CreateProduct/CreateProduct';
import AboutUs from './components/LandingPage/About_Us/AboutUs';
import Register from './components/Register/Register';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import UserPanel from './components/UserPanel/UserPanel'
import './App.css'
axios.defaults.baseURL = 'http://localhost:3002/api'


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/CreateProducts' element={<CreateProduct />} />
        <Route path="/product_detail/:id" element={<Details />} />
        <Route path='/product_list' element={<ProductList />} />
        <Route path='/about_us' element={<AboutUs />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path='settings/user' element={<UserPanel />} />
        </Route>
      </Routes >
    </div>
  );
}

export default App;
