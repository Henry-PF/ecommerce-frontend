import { useState } from 'react'
import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import ProductList from './Components/ProductList/ProductList';
import Details from './Components/Detail/Details';
import './App.css'

axios.defaults.baseURL = 'http://localhost:3002/api'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/product_list' element={<ProductList />} />
        <Route path="/product_detail/:id" element={<Details />} />
      </Routes >
    </div>
  );
}


export default App;
