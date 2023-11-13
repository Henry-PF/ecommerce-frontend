import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import ProductList from './components/ProductList/ProductList';
import Details from './components/Detail/Details';
import './App.css'
import CreateProduct from './components/CreateProduct/CreateProduct';

axios.defaults.baseURL = "https://backend-dev-jnpc.1.us-1.fl0.io/api";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/CreateProducts' element={<CreateProduct />} />
        <Route path="/product_detail/:id" element={<Details />} />
        <Route path='/product_list' element={<ProductList />} />
      </Routes >
    </div>
  );
}


export default App;
