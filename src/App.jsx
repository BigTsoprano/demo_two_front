import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AllProducts from "./pages/AllProducts";
import TestFilter from "./pages/TestFilter";
import SingleProduct from "./pages/SingleProduct";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AllProducts />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/success" element={<Success />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/testfilter" element={<TestFilter />} />
      </Routes>
    </Router>
  );
}

export default App;
