import axios from 'axios'
import { Route, Routes } from "react-router-dom";
import Home from './components/LandingPage/Home/Home'
import Details from './components/Detail/Details'
import ProductList from './components/ProductList/ProductList'
import AboutUs from './components/AboutUs/AboutUs'
import Carrito from './components/Carrito/Carrito'
import Register from './components/Register/Register'
import UserPanel from './components/UserPanel/UserPanel'
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes'
import ProductReviewsAndForm from './components/LandingPage/Reviews/ProductReviews';

import './App.css'
axios.defaults.baseURL = 'http://localhost:3002/api'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path="/product_detail/:id" element={<Details />} />
        <Route path='/product_list' element={<ProductList />} />
        <Route path="/product_reviews/:id" element={<ProductReviewsAndForm />} />
        <Route path='/about_us' element={<AboutUs />} />
        <Route path='/cart' element={<Carrito />} />
        <Route path='/register' element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path='settings/user' element={<UserPanel />} />
        </Route>
      </Routes >
    </div>
  );
}

export default App;
