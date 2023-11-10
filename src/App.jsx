
import { BrowserRouter as Router } from 'react-router-dom';

import ProductList from './Components/ProductList/ProductList';

import { useState } from 'react'
import Home from './components/LandingPage/Home/Home'
import './App.css'

function App() {


function App() {
  return (

    <Router>
      <div className="App">
        <ProductList />
        {/* El resto de tu contenido */}
      </div>
      <Home />
    </Router>
  );
}

export default App;
