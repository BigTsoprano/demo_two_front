import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../redux/cartRedux";
import { useLocation } from "react-router";
import { publicRequest } from "../requestMethods";
// import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.data;
  const cart = location.state.cart;
  const dispatch = useDispatch();

  //   const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await publicRequest.post("/orders", {
          //   userId: currentUser._id,
          product: cart.map((item) => ({
            productId: item._id,
            quantity: item.quantity,
          })),
          amount: data.amount,
          address: data.billing_details.address,
        });
        setOrderId(res.data._id);
        dispatch(resetCart());
      } catch {}
    };
    data && createOrder();
  }, [cart, data]);

  return (
    <div className="bg-gray-100 h-screen">
      <div className="bg-white p-6  md:mx-auto">
        <svg
          viewBox="0 0 24 24"
          className="text-green-600 w-16 h-16 mx-auto my-6"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          ></path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Done!
          </h3>
          <p className="text-gray-600 my-2">
            Thank you for completing your secure online payment.
          </p>
          <p className="text-gray-600 my-2">
            {orderId
              ? `Order has been created successfully. Your order number is ${orderId}`
              : `Successfull. Your order is being prepared...`}
          </p>
          <p className="text-gray-600 my-2"> Have a great day! </p>
          <div className="py-10 text-center">
            <Link
              to="/"
              className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
            >
              HOME PAGE
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
