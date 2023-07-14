// import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
// import Announcement from "../components/Announcement";
// import Footer from "../components/Footer";
import NavbarTest from "../components/NavbarTest";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeItem } from "../redux/cartRedux";

const KEY = import.meta.env.VITE_APP_STRIPE;
console.log(KEY);

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };
  console.log(stripeToken);
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
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
            Your Cart ({cart.quantity})
          </h2>
        </div>
        {/* <Bottom> */}
        <div className="mb-5 flex flex-col sm:mb-8 sm:divide-y sm:border-t sm:border-b">
          {cart.products.map((product) => (
            <div key={product._id}>
              <div className="flex flex-wrap gap-4 sm:py-2.5 lg:gap-6">
                <div className="sm:-my-2.5">
                  <div className="group relative block h-40 w-24 overflow-hidden rounded-lg bg-gray-100 sm:h-56 sm:w-40">
                    <img
                      src={product.img}
                      loading="lazy"
                      alt="Photo by vahid kanani"
                      className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <a
                      href="#"
                      className="mb-1 inline-block text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-xl"
                    >
                      {product.title}
                    </a>

                    <span className="block text-gray-500">Size: S</span>
                    <span className="block text-gray-500">Color: Black</span>
                  </div>

                  <div>
                    {/* <span className="mb-1 block font-bold text-gray-800 md:text-lg">
                      $49.99
                    </span> */}
                  </div>
                </div>

                <div className="flex w-full justify-between border-t pt-4 sm:w-auto sm:border-none sm:pt-0">
                  <div className="flex flex-col items-start gap-2">
                    <div className="flex h-12 w-20 overflow-hidden">
                      <span className="block text-gray-500">
                        Quantity: {product.quantity}
                      </span>
                    </div>

                    <button
                      onClick={() => dispatch(removeItem(product))}
                      className="select-none text-sm font-semibold text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700"
                    >
                      Delete
                    </button>
                  </div>

                  <div className="ml-4 pt-3 sm:pt-2 md:ml-8 lg:ml-16">
                    <span className="block font-bold text-gray-800 md:text-lg">
                      ${product.price * product.quantity}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
            <div className="space-y-1">
              <div className="flex justify-between gap-4 text-gray-500">
                <span>Subtotal</span>
                <span>${cart.total}</span>
              </div>

              <div className="flex justify-between gap-4 text-gray-500">
                <span>Shipping</span>
                <span>$4.99</span>
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
          <div className="border">
            <p>Sample Credit Card:</p>
            <p>4242 4242 4242 4242</p>
            <p>08/24</p>
            <p>CVC: 123</p>
          </div>
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
              <button className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                Check out
              </button>
            </StripeCheckout>
          )}
        </div>
        {/* </Bottom> */}
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Cart;
