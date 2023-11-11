import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import ProductList from './Components/ProductList/ProductList';
import './App.css'
import CreateProduct from './Components/CreateProduct/CreateProduct';

axios.defaults.baseURL = 'http://localhost:3002/api'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/CreateProducts' element={<CreateProduct/>} />
        <Route exact path='/product_list' element={<ProductList />} />
      </Routes >
    </div>
  );
}


export default App;
