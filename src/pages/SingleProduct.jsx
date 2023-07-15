import React from "react";
import NavbarTest from "../components/NavbarTest";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import {motion} from 'framer-motion'

export default function SingleProduct() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [desc, setDesc] = useState("");
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "add") {
      setQuantity(quantity + 1);
    } else {
      quantity > 1 && setQuantity(quantity - 1);
    }
  };

  const handleClick = () => {
    dispatch(addProduct({ ...product, quantity }));
  };
  return (
    <div>
      <div className="antialiased">
        <NavbarTest />

        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
                
                  <div style={{margin:'10px', minWidth:'45%', overflow:'hidden'}} className="flex items-center justify-center rounded bg-white border ">
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3, ease: "easeInOut", type: "spring" }}
                      src={product.img}
                      className="h-64 md:h-80 rounded  flex items-center justify-center"
                    />
               
              </div>
              <div className="md:flex-1 px-4">
                <div style={{display:'flex', justifyContent:'space-between'}}>
                <h2 className="leading-tight tracking-tight font-bold text-gray-800 text-lg md:text-lg">
                  {product.title}
                </h2>
                <p style={{marginRight:'2rem'}} className="text-green-600 text-sm">{product.type}</p>
                </div>
                {product?.effect?.map((effect) => (
                  <span className="mb-4 text-gray-500 text-sm" key={effect}>
                    {effect}{" "}
                  </span>
                ))}

                  <p className="text-base text-slate-700" style={{paddingTop:'10px'}} >{product.desc}</p>
                <div className="flex items-center space-x-4 my-4">
                  <div>
                    <div style={{display:'flex', alignItems:'center'}} className="rounded bg-white border  py-1 px-3">
                      <span className="font-bold text-green-600 text-base">
                      <span className="text-slate-700 mr-1 mt-1">$</span> {product.price}
                      </span>
                    </div>
                  </div>
                </div>
               

                <div style={{display:'flex', alignItems:'center'}} className="flex py-4 space-x-4">
                  <div className="flex flex-col divide-y border-l">
                    <button
                      onClick={() => handleQuantity("add")}
                      className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-green-100 active:bg-gray-200"
                    >
                     <AddIcon className="text-slate-700" style={{fontSize:'18px'}}/>
                    </button>
                    <button
                      onClick={() => handleQuantity("remove")}
                      className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-green-100 active:bg-gray-200"
                    >
                      <RemoveIcon className="text-slate-700" style={{fontSize:'18px'}} />
                    </button>
                  </div>
                  <div className="relative">
                    {/* <button onClick={() => handleQuantity("add")}>Add</button> */}
                 
                    <span style={{padding:'9px 10px'}} className="cursor-pointer appearance-none rounded border border-gray-200 text-sm text-slate-600 flex items-end ">
                     quantity: {quantity}
                    </span>
                    {/* <button onClick={() => handleQuantity("remove")}>
                      Remove
                    </button> */}
                  </div>

                  <button
                  style={{padding:'7px 9px'}}
                    type="button"
                    onClick={handleClick}
                    className="font-semibold text-base rounded bg-green-500 hover:bg-slate-700  text-white"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
