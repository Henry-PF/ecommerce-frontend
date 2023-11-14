import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import ProductList from './Components/ProductList/ProductList';
import Details from './Components/Detail/Details';
import './App.css'
import CreateProduct from './Components/CreateProduct/CreateProduct';
import AboutUs from './Components/LandingPage/About_Us/AboutUs';
import Register from './Components/Register/Register';
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
      </Routes >
    </div>
  );
}

export default App;
