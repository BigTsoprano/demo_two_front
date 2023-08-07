// import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
// import { Link } from "react-router-dom";
import NavbarTest from "../components/NavbarTest";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeItem,
  removeSingleProduct,
} from "../redux/cartRedux";
import { motion } from "framer-motion";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";


const Cart = () => {
  const cart = useSelector((state) => state.cart);
  //   const navigate = useNavigate();
  const dispatch = useDispatch();

  //   const onToken = (token) => {
  //     setStripeToken(token);
  //   };



  const containerVariants = {
    hidden: { x: "-100%" },
    visible: {
      x: 0,
      transition: { duration: 0.4, ease: "linear" },
    },
    exit: {
      x: "-100%",
      transition: { ease: "easeInOut" },
    },
  };

  return (
    <div id="cart"
      style={{ paddingTop: "10vh", minHeight: "120vh" }}
      className="bg-slate-100"
    >
      {/* <Announcement /> */}
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        className="mx-auto max-w-screen-lg px-4 md:px-8 pt-12"
      >
        <div className="mb-2 sm:mb-5 lg:mb-10">
          <h2 className="mb-4 text-left text-lg font-bold text-gray-800 border-b  md:mb-6 lg:text-lg">
            Your Cart {cart.quantity > 0 ? "" : "is empty"}
          </h2>
        </div>
        {/* <Bottom> */}
        <div
          className="cart_checkout"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            margin: "1rem 0",
          }}
        >
          <div className="" style={{ minWidth: "50%", height: "auto" }}>
            <div
              style={{
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              }}
              className=" flex flex-col bg-white  sm:divide-y shadow-sm rounded-lg border-b -drop-shadow-md"
            >
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
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <a>
                            <p className="text-sm font-medium text-gray-900">
                              {product.title}
                            </p>
                          </a>
                          <span className="block text-xs text-green-500">
                            {product.type}
                          </span>

                          <p
                            style={{ marginRight: "1rem" }}
                            className="text-xs text-slate-600"
                          >
                            weight: {product.weight}gs
                          </p>
                          <p className="text-xs text-slate-600">
                            type: {product.categories}
                          </p>
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
                                removeSingleProduct({ ...product, quantity: 1 })
                              )
                            }
                            className="select-none  p-1 rounded-full flex items-center bg-slate-100 text-sm font-semibold hover:text-red-500 transition duration-100 hover:text-slate-600 active:text-indigo-700"
                          >
                            <RemoveIcon style={{ fontSize: "16px" }} />
                          </button>
                          <div>
                            <p
                              style={{ padding: "4px 6px", margin: "0 auto" }}
                              className="text-xs border rounded text-slate-600"
                            >
                              {product.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              dispatch(addProduct({ ...product, quantity: 1 }))
                            }
                            className="select-none p-1 bg-slate-900 text-white flex items-center rounded-full text-sm font-semibold  transition duration-100 text-slate-800 active:text-indigo-700"
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
            </div>
          </div>
          <div
            style={{ minWidth: "40%", margin: "0 1rem" }}
            className="flex flex-col items-start gap-4"
          >
            <div
              style={{ boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset" }}
              className="subtotal_sect w-full rounded-lg bg-green-100 p-4 sm:max-w-xs"
            >
              <div className="space-y-1">
                <div className="flex justify-between gap-4 text-sm font-semibold text-slate-600">
                  <span>Subtotal:</span>
                  <span>${cart.total}</span>
                </div>

                <div className="flex justify-between gap-4 text-sm font-bold text-slate-600">
                  <span>Pick up</span>
                  <span>$0</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-start justify-between gap-4 text-gray-800">
                  <span className="text-sm font-bold">Total</span>

                  <span className="flex flex-col items-end">
                    <span className="text-sm font-bold">${cart.total} USD</span>
                    <span className="text-xs text-gray-500">including VAT</span>
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Link to="/">
                <button
                  style={{ padding: "10px 16px", marginRight: "2rem" }}
                  className=" rounded-lg shadow-sm bg-white hover:text-slate-900 hover:border hover:border-black transition duration-100 hover:border-slate-900 hover:bg-white"
                >
                  keep shopping
                </button>
              </Link>
              {cart.products.length > 0 && (
                // <StripeCheckout
                //   name="Your Shop Name"
                //   image="https://avatars.githubusercontent.com/u/1486366?v=4"
                //   billingAddress
                //   shippingAddress
                //   description={`Your total is $${cart.total}`}
                //   amount={cart.total * 100}
                //   token={onToken}
                //   stripeKey={KEY}
                // >
                <Link to="/form">
                  <button
                    style={{ padding: "10px 16px" }}
                    className="inline-block hover:border border-slate-900  rounded-lg bg-green-500  text-center text-sm font-base text-white hover:text-slate-900 outline-none ring-indigo-300 transition duration-100 hover:bg-white hover:text-slate-900 focus-visible:ring active:bg-green-600 md:text-base"
                  >
                    Checkout <KeyboardArrowRightIcon />
                  </button>
                  {/* </StripeCheckout> */}
                </Link>
              )}
            </div>
          </div>
        </div>
        {/* </Bottom> */}
      </motion.div>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;
