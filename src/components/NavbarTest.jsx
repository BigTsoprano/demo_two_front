import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {
  addProduct,
  removeItem,
  removeSingleProduct,
} from "../redux/cartRedux";
import { useState } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

import { motion, AnimatePresence } from "framer-motion";
import MonitorWeightOutlinedIcon from "@mui/icons-material/MonitorWeightOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function NavbarTest() {
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
      <div className="nav_bar  bg-white">
        <div className="navbar_wrap">
          <Link to="/">
            <h1
              className="text-slate-900"
              style={{ fontWeight: "600", fontSize: "18px" }}
            >
              Demo
            </h1>
          </Link>

          <div
            onMouseEnter={handlePopoverEnter}
            onMouseLeave={handlePopoverLeave}
            style={{ marginRight: "1rem", height: "100%" }}
            className="hover:text-slate-600 text-slate-800"
          >
            <button>
              <div className="relative py-2">
                <div className="t-0 absolute left-3">
                  <p className="flex h-2 w-2 items-center text-bold justify-center rounded-full bg-green-100 p-3 text-sm text-slate-900">
                    {cart.quantity}
                  </p>
                </div>
                <Link
                  className="text-sm"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    padding: "6px",
                  }}
                  to="/checkout"
                >
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
                  <p style={{ paddingLeft: "7px" }}>My cart</p>
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
                  className="popover   border-t"
                  style={{
                    minHeight: "20vh",
                    minWidth: "300px",
                    width: "30%",
                    height: "auto",
                    position: "absolute",
                    backgroundColor: "#fff",
                    right: "0",
                    padding: "1rem",
                    top: "10vh",
                    borderBottomLeftRadius: "8px",
                  }}
                >
                  <p
                    style={{ display: "flex", justifyContent: "center" }}
                    className="font-semibold text-lg"
                  >
                    Your cart
                  </p>
                  {cart.products.map((product) => (
                    <ul className="space-y-4" key={product._id}>
                      <li
                        style={{
                          padding: "10px",
                          // margin: "0 20px",
                          // display: "flex",
                          // flexDirection: "row",
                          // alignItems: "center",
                        }}
                        className="flex items-center gap-4"
                      >
                        <img
                          src={product.img}
                          loading="lazy"
                          alt="Photo by vahid kanani"
                          className="h-16 w-16 rounded object-cover"
                        />

                        <div className="flex flex-1 flex-col justify-between">
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                              <span className="block text-xs text-green-500">
                                {product.type}
                              </span>
                              <a
                                href="#"
                                className="text-sm font-medium text-gray-900"
                              >
                                {product.title}
                              </a>

                              <p
                                style={{ marginRight: "1rem" }}
                                className="text-xs text-slate-600"
                              >
                                weight: {product.weight}gs
                              </p>
                              {/* <p className="text-xs text-slate-600">
                           type: {product.categories}
                         </p> */}
                            </dl>
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: "10px",
                              }}
                              className="flex flex-1 items-center justify-end gap-2"
                            >
                              <button
                                onClick={() =>
                                  dispatch(
                                    removeSingleProduct({
                                      ...product,
                                      quantity: 1,
                                    })
                                  )
                                }
                                className="select-none flex items-center p-1 bg-slate-100 rounded-full text-sm font-semibold hover:text-red-500 transition duration-100 hover:text-slate-600 active:text-indigo-700"
                              >
                                <RemoveIcon style={{ fontSize: "16px" }} />
                              </button>
                              <div>
                                <p
                                  style={{
                                    padding: "4px 6px",
                                    margin: "0 auto",
                                  }}
                                  className="text-xs border rounded text-slate-600"
                                >
                                  {product.quantity}
                                </p>
                              </div>
                              <button
                                onClick={() =>
                                  dispatch(
                                    addProduct({ ...product, quantity: 1 })
                                  )
                                }
                                className="select-none shadow-lg hover:shadow-none flex items-center p-1 text-white rounded-full bg-slate-900  transition duration-100 hover:text-white active:text-green-500"
                              >
                                <AddIcon style={{ fontSize: "16px" }} />
                              </button>
                            </div>
                            {/* <div
                    
                     className="flex w-full   sm:w-auto sm:border-none sm:pt-0"
                   >
                     <button
                       onClick={() => dispatch(removeItem(product))}
                       className="select-none items-center text-xs font-semibold text-red-500 transition duration-100 hover:text-slate-600 active:text-indigo-700"
                     >
                       <DeleteForeverIcon style={{ fontSize: "16px" }} />{" "}
                       delete
                     </button>

                     <div className="ml-4 flex items-center pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                       <span className="block font-semibold text-slate-800 md:text-base">
                         ${product.price * product.quantity}
                       </span>
                     </div>
                   </div> */}
                          </div>
                        </div>
                        <div>
                          {/* <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                     $49.99
                   </span> */}
                        </div>
                      </li>
                    </ul>
                  ))}
                  <div
                    className="py-3 text-sm border-t"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <p className="font-semibold">SubTotal:</p>{" "}
                    <p>${cart.total}</p>
                  </div>
                  <Link to="/checkout">
                    <button
                      style={{ padding: "10px 12px", width: "100%" }}
                      className="bg-green-500 hover:border text-white hover:text-slate-900 rounded-lg hover:bg-white border-slate-900"
                    >
                      Go to checkout
                    </button>
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

{
  /* <Link  to="/">
<h1 style={{color:'#22c44e', fontWeight:'600', fontSize:'18px'}}>Your logo</h1>
</Link> */
}

{
  /* <div className="relative py-2">
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
</div> */
}
