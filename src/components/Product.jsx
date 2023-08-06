import { Link } from "react-router-dom";
import { addProduct, removeSingleProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion, AnimatePresence } from "framer-motion";
import FaceRetouchingNaturalIcon from "@mui/icons-material/FaceRetouchingNatural";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import { LazyLoadImage } from "react-lazy-load-image-component";

import { useEffect, useState } from "react";

function getColorFromType(type) {
  switch (type) {
    case "sativa":
      return "text-green-500";
    case "indica":
      return "text-yellow-500";
    case "hybrid":
      return "text-indigo-500";
    default:
      return "text-gray-500";
  }
}

const Product = ({ item }) => {
  const [quantity, setQquantity] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    if (cart.products.length == 0) setQquantity(0);
    if (cart.products.find((e) => e._id === item._id) == undefined)
      setQquantity(0);
    cart.products.forEach((product) => {
      //   console.log(Object.keys(product).length);
      if (item._id === product._id) {
        //   if(Object.keys(product).length)
        console.log(product.quantity);
        setQquantity(product.quantity);
        // return;
      }
      if (!item._id === product._id) setQquantity(0);
      console.log(product.quantity);

      return;
      //   if (item._id !== product._id) {
      //     setQquantity(product.quantity);
      //   }
    });
    // if()
  }, [cart.products]);
  console.log(quantity);

  const handleClick = (type) => {
    if (type === "add") {
      dispatch(addProduct({ ...item, quantity: 1 }));
    } else if (type === "remove") {
      if (quantity == 1) setQquantity(0);
      dispatch(removeSingleProduct({ ...item, quantity: 1 }));
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.1 }}
      className="product_one border bg-slate-100 rounded-lg   "
    >
      <div
        style={{
          maxHeight: "25vh",
          height: "25vh",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
        }}
        className="group  relative  block overflow-hidden transition duration-100 hover:shadow-sm  bg-slate-100 "
      >
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "10px",
            left: "10px",
          }}
          className={`${getColorFromType(
            item.type
          )} tracking-wide text-xs font-medium`}
        >
          {item.type}
        </span>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: "10px",
            right: "10px",
            flexDirection: "row-reverse",
          }}
        >
          <motion.button
            whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
            transition={{ duration: 0.1 }}
            style={{
              padding: ".55rem",
              zIndex: "9",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="rounded-full drop-shadow-sm hover:drop-shadow-xl  bg-slate-900  active:text-green-500  transition duration-200 hover:bg-slate-800  active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  "
            onClick={() => handleClick("add")}
          >
            <AddIcon style={{ fontSize: "19px" }} />
          </motion.button>

          {quantity > 0 && (
            <div className="" style={{}}>
              <span>
                <motion.button
                  whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
                  style={{
                    padding: ".50rem",
                    zIndex: "9",
                  }}
                  className="drop-shadow-md relative bg-white rounded-full active:text-green-500  hover:bg-green-100 hover:text-slate-600  active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-900  "
                  onClick={() => handleClick("remove")}
                >
                  <RemoveIcon style={{ fontSize: "19px" }} />
                </motion.button>
              </span>
              <span
                className="relative bg-white py-1 px-2 shadow-2xl rounded-lg"
                style={{ margin: "20px", zIndex: "9" }}
              >
                {quantity}
              </span>
            </div>
          )}
        </div>
        <Link to={`/product/${item._id}`} onClick={() => window.scrollTo(0, 0)}>
          <AnimatePresence>
            {quantity > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "rgba(0,0,0,.05)",
                  transition: "ease-in-out .3s ",
                }}
                className="absolute w-full h-full transition duration-100 backdrop-blur-sm "
              ></motion.div>
            )}
          </AnimatePresence>

          <LazyLoadImage
            style={{}}
            src={item.img}
            width={600}
            height={400}
            loading="lazy"
            alt="Photo by Austin Wade"
            className="w-full h-full bg-white object-contain shadow-0 object-center transition duration-200 "
          />
        </Link>
      </div>

      <div
        className="card_hover "
        style={{
          position: "relative",
          bottom: "0",
          minHeight: "14vh",
          width: "100%",
        }}
      >
        <div
          style={{}}
          className="flex  items-start justify-between gap-2 px-2"
        >
          <div className="flex flex-col w-full">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Link
                to={`/product/${item._id}`}
                onClick={() => window.scrollTo(0, 0)}
              >
                <p className="card_title text-sm font-semibold  text-slate-900 transition duration-100 hover:text-slate-600  lg:text-sm">
                  {item.title}
                </p>
              </Link>
              <div className="flex flex-col items-end">
                <span className="font-base text-sm font-semibold text-gray-800 lg:text-sm">
                  ${item.price}
                </span>
                {/* <span className="text-sm text-red-500 line-through">$39.99</span> */}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: "6px",
              }}
            >
              <FaceRetouchingNaturalIcon
                className="text-slate-500 mr-1"
                style={{ fontSize: "16px" }}
              />
              {item?.effect?.map((effect) => (
                <span className=" text-gray-500 text-xs pr-1" key={effect}>
                  {effect}{" "}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "10px",
              }}
            >
              <ScienceOutlinedIcon
                className="text-slate-500 mr-1"
                style={{ fontSize: "16px" }}
              />
              <p
                style={{ paddingRight: "5px" }}
                className="text-xs text-slate-500 font-base border-r "
              >
                thc: {item.thc}%
              </p>
              <p
                style={{ marginLeft: "5px" }}
                className="text-xs text-slate-500 font-base"
              >
                cbd: {item.cbd}%
              </p>
            </div>
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
