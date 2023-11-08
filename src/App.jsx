import { useState } from 'react'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import ProductList from './Components/ProductList/ProductList';
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/product_list' element={<ProductList />} />

      </Routes >
    </div>
  );
}


export default App;
