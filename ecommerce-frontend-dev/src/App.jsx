import { Routes, Route } from "react-router-dom";
import Home from './components/LandingPage/Home/Home';
import ProductList from './Components/ProductList/ProductList';
import Details from "./Components/Detail/Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product_list" element={<ProductList />} />
        <Route path="/product_detail/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
