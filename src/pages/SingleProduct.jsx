import React from "react";
import NavbarTest from "../components/NavbarTest";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";

export default function SingleProduct() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
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
              <div className="md:flex-1 px-4">
                <div>
                  <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4">
                    <img
                      src={product.img}
                      className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center"
                    />
                  </div>
                </div>
              </div>
              <div className="md:flex-1 px-4">
                <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
                  {product.title}
                </h2>
                <p className="text-gray-500 text-sm">{product.type}</p>

                <div className="flex items-center space-x-4 my-4">
                  <div>
                    <div className="rounded-lg bg-gray-100 flex py-2 px-3">
                      <span className="text-indigo-400 mr-1 mt-1">$</span>
                      <span className="font-bold text-indigo-600 text-3xl">
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>
                {product?.effect?.map((effect) => (
                  <span className="text-gray-500" key={effect}>
                    {effect}{" "}
                  </span>
                ))}

                <div className="flex py-4 space-x-4">
                  <div className="flex flex-col divide-y border-l">
                    <button
                      onClick={() => handleQuantity("add")}
                      className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleQuantity("remove")}
                      className="flex w-6 flex-1 select-none items-center justify-center bg-white leading-none transition duration-100 hover:bg-gray-100 active:bg-gray-200"
                    >
                      -
                    </button>
                  </div>
                  <div className="relative">
                    {/* <button onClick={() => handleQuantity("add")}>Add</button> */}
                    <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">
                      Qty
                    </div>
                    <span className="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                      {quantity}
                    </span>
                    {/* <button onClick={() => handleQuantity("remove")}>
                      Remove
                    </button> */}
                  </div>

                  <button
                    type="button"
                    onClick={handleClick}
                    className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white"
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
