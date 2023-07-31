import { Link } from "react-router-dom";
import { addProduct, removeSingleProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

const Product = ({ item }) => {
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();
  //   const cart = useSelector((state) => state.cart);

  //   console.log(item);

  const handleClick = (type) => {
    if (type === "add") {
      dispatch(addProduct({ ...item, quantity: 1 }));
      setQuantity(quantity + 1);
    } else if (type === "remove") {
      dispatch(removeSingleProduct({ ...item, quantity: 1 }));
      setQuantity(quantity - 1);
    }
  };

  //   console.log(quantity);
  return (
    <motion.div layout  initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.2 }}
    className="product_one  bg-white rounded-lg  hover:border-green-500 ">
      
      <div style={{maxHeight:'25vh', height:'25vh'}} className="group  relative mb-2 block overflow-hidden transition duration-100 hover:shadow-sm  bg-gray-100  rounded lg:mb-3">
      <div style={{display:'flex', justifyContent:'center', alignItems:'center',  position: "absolute",
              top: "10px",
              right: "10px",
              flexDirection:'row-reverse',
           
              }}>
          <button
           
            style={{
             
              padding: "6px 6px",
              zIndex: "99",
           
              
            }}
            
            className="rounded-lg drop-shadow-md hover:drop-shadow-lg  bg-slate-900  active:text-green-500  transition duration-150 hover:bg-green-100 hover:text-green-600 active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  "
            onClick={() => handleClick("add")}
          >
            <AddIcon />
          </button>
      
        {quantity > 0 && (
          <div className="" style={{}}>
          
            <span>
              <button  
                style={{
                 
                
                  padding: "6px 6px",
                  zIndex: "100",
                }}
              className="rounded-lg drop-shadow-md bg-red-500  active:text-green-500 border-slate-900 hover:bg-green-100 hover:text-green-600  active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  " onClick={() => handleClick("remove")}><RemoveIcon/></button>
            </span>
            <span style={{margin:'20px'}}>{quantity}</span>
          </div>
        )}
        </div>
        <Link  to={`/product/${item._id}`}>
          <img
            style={{ borderBottom: "1px solid #e5e5e5" }}
            src={item.img}
            loading="lazy"
            alt="Photo by Austin Wade"
            className="w-full h-full bg-white object-contain shadow-0 object-center transition duration-200 "
          />
        </Link>
      </div>
      
      <div className="card_hover"
        style={{
          position: "relative",
          bottom: "0",
          minHeight: "13vh",
          width: "100%",
        }}
      >
        <div style={{}} className="flex  items-start justify-between gap-2 px-2">
          <div className="flex flex-col">
            <span className="text-green-600 text-xs">{item.type}</span>
            <Link to={`/product/${item._id}`}>
              <p className="text-sm font-semibold  text-slate-900 transition duration-100 hover:text-gray-500 lg:text-sm">
                {item.title}
              </p>
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingTop: "10px",
              }}
            >
              <p
                style={{ paddingRight: "5px" }}
                className="text-xs font-base border-r "
              >
                thc: {item.thc}%
              </p>
              <p
                style={{ paddingLeft: "5px" }}
                className="text-xs font-base"
              >
                cbd: {item.cbd}%
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <span className="font-base text-sm text-gray-600 lg:text-sm">
              ${item.price}
            </span>
            {/* <span className="text-sm text-red-500 line-through">$39.99</span> */}
          </div>
        </div>
        {/* <motion.button
          whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
          whileHover={{ scale: 1.1, type: "spring", bounce: 50 }}
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            padding: "6px 6px",
            zIndex: "100",
            borderRadius: "35px",
          }}
          className="rounded bg-green-500 hover:border active:text-green-500 border-slate-900 hover:bg-white hover:text-slate-900 active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  "
          onClick={() => handleClick("add")}
        >
          <ShoppingCartCheckoutIcon />
        </motion.button> */}
   
      </div>
    </motion.div>
    // </Container>
  );
};

export default Product;
