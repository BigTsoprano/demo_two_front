import {  Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AllProducts from "./pages/AllProducts";
import SingleProduct from "./pages/SingleProduct";
import Checkout from "./pages/Checkout";
import NavbarTest from "./components/NavbarTest";
import { AnimatePresence } from "framer-motion";
import Footer from "./components/Footer";

function App() {

const location = useLocation();


  return (
    <>

   
      <NavbarTest />
      <AnimatePresence>
        
      <Routes location={location} key={location.key}>
        <Route exact path="/" element={<AllProducts />} />
        <Route path="/checkout" element={<Cart />} />
        <Route path="/form" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/product/:id" element={<SingleProduct />} />
      </Routes>
      </AnimatePresence>
      <Footer />
   
    </>
  );
}

export default App;
