// import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
import NavbarTest from "../components/NavbarTest";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProduct,
  removeItem,
  removeSingleProduct,
} from "../redux/cartRedux";

import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// const LocalStorage = JSON.parse(localStorage.getItem("cart") || "[]");

const KEY = import.meta.env.VITE_APP_STRIPE;
console.log(KEY);

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  //   const [cartFromLocalStorage, setCartFromLocalStorage] =
  //     useState(LocalStorage);
  //   console.log(cartFromLocalStorage);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);

  //   useEffect(() => {
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //   });

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: cart.total * 100,
        });
        navigate("/success", {
          state: { data: res.data, cart: cart.products },
        });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  return (
    <div className="bg-white">
      <NavbarTest />
      {/* <Announcement /> */}
      <div className="mx-auto max-w-screen-lg px-4 md:px-8 pt-12">
        <div className="mb-6 sm:mb-10 lg:mb-16">
          <h2 className="mb-4 text-left text-lg font-bold text-gray-800 border-b  md:mb-6 lg:text-lg">
            Your Cart Is Empty
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
          <div style={{ minWidth: "50%" }}>
            <div className=" flex flex-col  sm:divide-y shadow-sm rounded border">
              {cart.products.map((product) => (
                <div key={product._id}>
                  <div
                    style={{ margin: "0 20px" }}
                    className="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6"
                  >
                    <div className="group relative block h-35 w-20 overflow-hidden rounded-lg bg-white ">
                      <img
                        src={product.img}
                        loading="lazy"
                        alt="Photo by vahid kanani"
                        className="h-full w-full object-contain  object-center transition duration-200 group-hover:scale-110"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <a
                          href="#"
                          className="mb-1 inline-block text-base font-semibold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-base"
                        >
                          {product.title}
                        </a>
                        <span className="block text-xs text-green-500">
                          {product.type}
                        </span>
                        <span className="block text-gray-500">
                          {product.categories}
                        </span>
                        <span className="block font-semibold text-sm text-slate-700">
                          {product.weight}gs
                        </span>
                      </div>

                      <div>
                        {/* <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                      $49.99
                    </span> */}
                      </div>
                    </div>

                    <div className="flex w-full justify-between  pt-4 sm:w-auto sm:border-none sm:pt-0">
                      <div className="q_d flex flex-col items-start gap-2">
                        <div className="flex h-12 w-20 overflow-hidden">
                          <div>
                            <span className="block text-slate-600 text-xs">
                              Quantity: {product.quantity}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() =>
                            dispatch(addProduct({ ...product, quantity: 1 }))
                          }
                          className="select-none text-sm font-semibold text-red-500 transition duration-100 hover:text-slate-600 active:text-indigo-700"
                        >
                          +
                        </button>
                        <button
                          onClick={() =>
                            dispatch(
                              removeSingleProduct({ ...product, quantity: 1 })
                            )
                          }
                          className="select-none text-sm font-semibold text-red-500 transition duration-100 hover:text-slate-600 active:text-indigo-700"
                        >
                          -
                        </button>
                        <button
                          onClick={() => dispatch(removeItem(product))}
                          className="select-none text-sm font-semibold text-red-500 transition duration-100 hover:text-slate-600 active:text-indigo-700"
                        >
                          Delete
                        </button>
                      </div>

                      <div className="ml-4 flex items-center pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                        <span className="block font-semibold text-slate-800 md:text-base">
                          ${product.price * product.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            style={{ minWidth: "40%", margin: "1rem" }}
            className="flex flex-col items-start gap-4"
          >
            <div className="w-full rounded-lg bg-green-100 p-4 sm:max-w-xs">
              <div className="space-y-1">
                <div className="flex justify-between gap-4 text-gray-500">
                  <span>Subtotal</span>
                  <span>${cart.total}</span>
                </div>

                <div className="flex justify-between gap-4 text-gray-500">
                  <span>Pick up</span>
                  <span>$0</span>
                </div>
              </div>

              <div className="mt-4 border-t pt-4">
                <div className="flex items-start justify-between gap-4 text-gray-800">
                  <span className="text-lg font-bold">Total</span>

                  <span className="flex flex-col items-end">
                    <span className="text-lg font-bold">${cart.total} USD</span>
                    <span className="text-sm text-gray-500">including VAT</span>
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                padding: "10px",
                boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset",
              }}
              className="border rounded bg-slate-50"
            >
              <p style={{ paddingBottom: "10px" }} className="font-semibold">
                Sample checkout card
              </p>
              <p>
                <span>Card #: </span>4242 4242 4242 4242
              </p>
              <p>
                <span>Exp. date: </span>08/24
              </p>
              <p>CVC: 123</p>
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
                  className="border rounded hover:text-green-600 hover:border-green-500"
                >
                  keep shopping
                </button>
              </Link>
              {cart.products.length > 0 && (
                <StripeCheckout
                  name="Your Shop Name"
                  image="https://avatars.githubusercontent.com/u/1486366?v=4"
                  billingAddress
                  shippingAddress
                  description={`Your total is $${cart.total}`}
                  amount={cart.total * 100}
                  token={onToken}
                  stripeKey={KEY}
                >
                  <button
                    style={{ padding: "10px 16px" }}
                    className="inline-block shadow-md rounded-lg bg-green-500  text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-slate-800 focus-visible:ring active:bg-green-600 md:text-base"
                  >
                    Checkout <KeyboardArrowRightIcon />
                  </button>
                </StripeCheckout>
              )}
            </div>
          </div>
        </div>
        {/* </Bottom> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;
