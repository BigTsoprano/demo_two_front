import { Link } from "react-router-dom";
import { addProduct, removeSingleProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
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

  console.log(quantity);
  return (
    <div className="product  bg-white rounded border hover:border-green-500 ">
      <div className="group  relative mb-2 block h-56 overflow-hidden rounded bg-gray-100  lg:mb-3">
        <Link to={`/product/${item._id}`}>
          <img
            style={{ borderBottom: "1px solid #e5e5e5" }}
            src={item.img}
            loading="lazy"
            alt="Photo by Austin Wade"
            className="h-full w-full bg-white object-contain shadow-0 object-center transition duration-200 group-hover:scale-110"
          />
        </Link>
      </div>
      <div
        style={{
          position: "relative",
          bottom: "0",
          minHeight: "12vh",
          width: "100%",
        }}
      >
        <div className="flex items-start justify-between gap-2 px-2">
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
                className="text-xs font-semibold border-r "
              >
                thc: {item.thc}%
              </p>
              <p
                style={{ paddingLeft: "5px" }}
                className="text-xs font-semibold"
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
        {!(quantity > 0) && (
          <motion.button
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
          </motion.button>
        )}
        {quantity > 0 && (
          <div className="" style={{}}>
            <span>
              <button onClick={() => handleClick("add")}>+</button>
            </span>
            <span>{quantity}</span>
            <span>
              <button onClick={() => handleClick("remove")}>-</button>
            </span>
          </div>
        )}
      </div>
    </div>
    // </Container>
  );
};

export default Product;
