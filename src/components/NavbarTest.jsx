import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function NavbarTest() {
  const [state, setState] = useState(false);
  const quantity = useSelector((state) => state.cart.quantity);



  return (
   <div className="nav_bar bg-white">
    <div className="navbar_wrap">
    <Link  to="/">
<h1 style={{color:'#22c44e', fontWeight:'600', fontSize:'18px'}}>Your logo</h1>
</Link>
<div className="relative py-2">
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