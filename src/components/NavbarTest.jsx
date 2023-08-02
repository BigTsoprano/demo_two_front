import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {
  addProduct,
  removeItem,
  removeSingleProduct,
} from "../redux/cartRedux";
import { useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import { motion, AnimatePresence } from "framer-motion";
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';



export default function NavbarTest() {
  const quantity = useSelector((state) => state.cart.quantity);
const [show, setShow] = useState(false);
const [leaveTimeout, setLeaveTimeout] = useState(null);

const handlePopoverEnter = () => {
  clearTimeout(leaveTimeout);
  setShow(true);
};

const handlePopoverLeave = () => {
  const timeout = setTimeout(() => {
    setShow(false);
  }, 1000); // Delay duration: 2000 milliseconds (2 seconds)
  setLeaveTimeout(timeout);
};

const cart = useSelector((state) => state.cart);
const dispatch = useDispatch();



  return (
    <div>
   <div className="nav_bar drop-shadow-sm bg-white">
    <div className="navbar_wrap">
    <Link  to="/">
<h1 className='text-slate-900' style={{ fontWeight:'600', fontSize:'18px'}}>Demo</h1>
</Link>

<div 
 onMouseEnter={handlePopoverEnter}
 onMouseLeave={handlePopoverLeave}
  style={{marginRight:'1rem', height:'100%'}} className="hover:border hover:shadow-lg active:shadow-none ">
<button >
<div className="relative py-2">
<div className="t-0 absolute left-3">
  <p className="flex h-2 w-2 items-center text-bold justify-center rounded-full bg-green-100 p-3 text-sm text-slate-900">
    {quantity}
  </p>
</div>
<Link className="text-sm" style={{display:'flex', flexDirection:'row', alignItems:'flex-end', padding:'6px'}} to="/checkout">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="file: mt-4 h-5 w-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
  <p style={{paddingLeft:'7px'}}>My cart</p>
</Link>
</div>
</button>

     <AnimatePresence>
{show && (
<motion.div 
 initial={{ opacity: 0 }}
 animate={{
   
    opacity: 1,
 }}
 exit={{ opacity: 0 }}
 transition={{
   type: "spring",
   bounce: 0,
   duration: 0.3,
   delay: 0,
   ease: "easeInOut",
 }}
onMouseEnter={handlePopoverEnter}
onMouseLeave={handlePopoverLeave}
className="popover  shadow-md border-t border-b border-r border-l"
  style={{minHeight:'20vh', minWidth:'300px',width:'30%', height:'auto', position:'absolute', backgroundColor:'#fff', right:'0', padding:'1rem', top:'10vh', borderBottomLeftRadius:'8px'}}

  >
    <p  style={{display:'flex', justifyContent:'center'}} className="font-semibold text-lg">Your cart</p>
{cart.products.map((product) => (
                <div style={{display:'flex', flexDirection:'row'}} className="py-3" key={product._id}>
                  <img style={{height:'auto', width:'50px'}} src={product.img} alt={product.title} />
                  <div>
                  <p className="text-xs text-green-600">{product.type}</p>
                  <p className="font-semibold text-sm">{product.title}</p>
                  <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between'}}>
                  <div style={{display:'flex', flexDirection:'row-reverse', justifyContent:'space-between', alignItems:'center',}} >
                  <p style={{marginLeft:'2rem',display:'flex', alignItems:'center'}} className="text-xs text-slate-600"><MonitorWeightOutlinedIcon/>: {product.weight}gs</p>
                  <p style={{display:'flex', alignItems:'center'}} className="text-xs text-slate-600"><ShoppingBagOutlinedIcon/>: {product.quantity}</p>
                  </div>
                  </div>
                  </div>
                  <div style={{display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', position:'absolute', right:'20px'}}>
                  <p className="text-sm text-slate-700" >${product.price * product.quantity}</p>
                  <button style={{paddingTop:'10px', display:'flex', flexDirection:'row', alignItems:'center'}} className="text-xs text-red-600" onClick={() => dispatch(removeItem(product))}><DeleteForeverIcon style={{fontSize:'16px'}} />delete</button>
                  </div>
                </div>
              ))}
<div className="py-3 text-sm " style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
             <p className="font-semibold">SubTotal:</p> <p>${cart.total}</p>
             </div>
             <Link to="/checkout">
              <button style={{padding:'10px 12px', width:'100%'}} className="bg-green-500 hover:border text-white hover:text-slate-900 rounded-lg hover:bg-white border-slate-900">Go to checkout</button>
</Link>
</motion.div>
)}
</AnimatePresence>
</div>
    </div>
   </div>
    </div>
  );
}






{/* <Link  to="/">
<h1 style={{color:'#22c44e', fontWeight:'600', fontSize:'18px'}}>Your logo</h1>
</Link> */}

{/* <div className="relative py-2">
<div className="t-0 absolute left-3">
  <p className="flex h-2 w-2 items-center text-bold justify-center rounded-full bg-green-100 p-3 text-sm text-slate-900">
    {quantity}
  </p>
</div>
<Link to="/checkout">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="file: mt-4 h-6 w-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
    />
  </svg>
</Link>
</div> */}