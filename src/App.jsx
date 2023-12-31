import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./components/LandingPage/Home/Home";
import Details from "./components/Detail/Details";
import ProductList from "./components/ProductList/ProductList";
import AboutUs from "./components/AboutUs/AboutUs";
import Carrito from "./components/Carrito/Carrito";
import Register from "./components/Register/Register";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import ProductReviewsAndForm from "./components/LandingPage/Reviews/ProductReviews";
import "./App.css";
import UserReview from "./components/UserPanel/UserReview/UserReview";
import UserShopping from "./components/UserPanel/UserShopping/UserShopping";
import UserData from "./components/UserPanel/UserData/UserData";
import Unsubscribe from "./components/Unsubscribe/Unsubscribe";
import PaymentDone from "./components/PaymentDone/PaymentDone";
axios.defaults.baseURL = 'https://backend-dev-jnpc.1.us-1.fl0.io/api'
// axios.defaults.baseURL = "http://localhost:3002/api";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/product_detail/:id" element={<Details />} />
        <Route path="/product_list" element={<ProductList />} />
        <Route
          path="/product_reviews/:id"
          element={<ProductReviewsAndForm />}
        />
        <Route path="/about_us" element={<AboutUs />} />
        <Route path="/cart" element={<Carrito />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route exact path="settings/user/profile" element={<UserData />} />
          <Route
            exact
            path="settings/user/shopping"
            element={<UserShopping />}
          />
          <Route exact path="settings/user/review" element={<UserReview />} />
          <Route exact path="unsubscribe" element={<Navigate to={"/"} />} />
          <Route exact path="unsubscribe/:id" element={<Unsubscribe />} />
          <Route exact path="/payment_done/:id" element={<PaymentDone />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
