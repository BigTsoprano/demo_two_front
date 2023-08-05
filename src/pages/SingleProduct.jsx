import React from "react";
import NavbarTest from "../components/NavbarTest";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { publicRequest } from "../requestMethods";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { motion, AnimatePresence } from "framer-motion";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import MonitorWeightOutlinedIcon from '@mui/icons-material/MonitorWeightOutlined';
import { Swiper, SwiperSlide } from 'swiper/react';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';


// import required modules
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
function getColorFromType(type) {
  switch(type) {
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
export default function SingleProduct() {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [id]);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(
          `https://cart.01ninjas.com/api/products?category=${product.categories[0]}`
        );
        setSimilarProducts(res.data);
      } catch (err) {}
    };
    getProduct();
  }, [product]);

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
  const [thumbsSwiper, setThumbsSwiper] = useState(null);


  const containerVariants = {

    hidden: { x: "-100%" },
    visible: { x: 0 ,
    transition: {duration: 0.4, delay: 0.3, ease: "linear" }
    },
    exit: {
      x: "-100%",
      transition:{ease: "easeInOut"}
    }
  };



  return (
    <motion.div 
    animate="visible"
    exit="exit"
    variants={containerVariants}>
      <div className="antialiased">

        <div style={{paddingTop:'15vh'}} className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
            <div className="flex flex-col md:flex-row -mx-4">
           <div className="single_slider" style={{minWidth:'45%',maxWidth:'45%', height:'100%',paddingRight:'1rem', margin:'10px'}}>
                 <Swiper
        style={{
          '--swiper-navigation-color': '#000',
          '--swiper-pagination-color': '#000',
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 rounded-lg "

      >
<SwiperSlide>
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    type: "spring",
                  }}
                  src={product.img}
                  className="h-64 md:h-80  rounded-lg  flex items-center justify-center"
                />
                </SwiperSlide>
                <SwiperSlide >
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeInOut",
                    type: "spring",
                  }}
                  src={product.img}
                  className="h-64 md:h-80 rounded-lg  flex items-center justify-center"
                />
                </SwiperSlide>
                </Swiper>
                
                <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src={product.img} />
        </SwiperSlide>
        <SwiperSlide>
          <img src={product.img} />
        </SwiperSlide>
      </Swiper>
                
                </div>
            
              <div className="md:flex-1 px-4">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h2 className="leading-tight tracking-tight font-bold text-gray-800 text-lg md:text-lg">
                    {product.title}
                  </h2>
                  <p
                    style={{ marginRight: "2rem" }}
                    className="text-green-600 text-sm"
                  >
                    {product.type}
                  </p>
                </div>
                <div className="text-sm font-base text-slate-500" style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                  <ScienceOutlinedIcon className="mr-2 text-slate-500"/>
                  <p style={{paddingRight:'1rem'}}>thc: {product.thc}%</p>
                  <p>cbd: {product.cbd}%</p>
                </div>

                <div>
                <FaceRetouchingNaturalIcon className="mr-2 text-slate-500"/> 

                {product?.effect?.map((effect) => (
                  <span className="mb-4 text-gray-500 text-sm" key={effect}>
                   {effect}{" "}
                  </span>
                ))}
                </div>
               <div className="pt-1">
                <MonitorWeightOutlinedIcon className="mr-2 text-slate-500"/>
                  <span className="mb-4 text-gray-500 text-sm" >
                    {product.weight}gs{" "}
                  </span>
               </div>
               
                <p
                  className="text-base text-slate-700"
                  style={{ paddingTop: "10px" }}
                >
                  {product.desc}
                </p>
                <div className="flex items-center space-x-4 my-4">
                  <div>
                    <div
                      style={{ display: "flex", alignItems: "center" }}
                      className="rounded bg-white border  py-1 px-3"
                    >
                      <span className="font-bold text-green-600 text-base">
                        <span className="text-slate-700 mr-1 mt-1">$</span>{" "}
                        {product.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="flex py-4 space-x-4"
                >
                  <div className="flex">
                  <motion.button
                whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
                  style={{
                    padding: "6px 6px",
                    zIndex: "999",
                  }}
                  className="drop-shadow-md relative bg-slate-100 rounded-lg active:text-green-500  hover:bg-green-100 hover:text-slate-600  active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-900  "
                  onClick={() => handleQuantity("remove")}
                  >
                  <RemoveIcon />
                </motion.button>
                    
                  </div>
                  <div className="relative">
                    {/* <button onClick={() => handleQuantity("add")}>Add</button> */}

                    <span
                      style={{ padding: "9px 10px" }}
                      className="cursor-pointer appearance-none rounded border border-gray-200 text-sm text-slate-600 flex items-end "
                    >
                      quantity: {quantity}
                    </span>
                    
                    {/* <button onClick={() => handleQuantity("remove")}>
                      Remove
                    </button> */}
                  </div>
                  <motion.button
          whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
          transition={{ duration: 0.1 }}
            style={{
              padding: "6px 6px",
              zIndex: "99",
            }}                      onClick={() => handleQuantity("add")}
            className="rounded-lg drop-shadow-md hover:drop-shadow-lg  bg-slate-900  active:text-green-500  transition duration-200 hover:bg-green-100 hover:text-green-600 active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  "
                    >
                   <AddIcon />
          </motion.button>

                </div>
                  <motion.button
                    whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
                    style={{ padding: "9px 9px", }}
                    type="button"
                    onClick={handleClick}
                    className="group w-full  [transform:translateZ(0)] px-6 py-3 rounded-lg bg-green-500 overflow-hidden relative before:shadow-md before:rounded-lg before:absolute before:bg-white before:border before:text-slate-900 before:border-slate-900 before:bottom-0 before:left-0 before:h-full before:w-full before:-translate-x-full hover:before:translate-x-0 before:transition before:ease-in-out before:duration-500 "
                  >
                    <span class="relative z-0 text-white hover:text-black font-medium group-hover:text-slate-900 transition ease-in-out duration-500">
                    Add to cart
                    </span>
                  </motion.button>
              

              </div>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
        <header>
      <h2 style={{paddingTop:'4rem', }} className="text-lg font-bold border-t text-gray-900 sm:text-lg">
        Related products
      </h2>

      <p className="max-w-md mt-4 text-base  text-slate-700">
      Unveil a world of possibilities as you indulge in the finest selection curated just for you.
      </p>
    </header>
    {/* product section*/}
        <ul className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
          {similarProducts.map((item) => (
            <li
              key={item._id}
              className="product_one  bg-slate-100 rounded-lg  hover:border-green-500"
            >
              <div
        style={{ maxHeight: "25vh", height: "25vh", borderTopLeftRadius:'8px', borderTopRightRadius:'8px', }}
        className="group  relative mb-2 block overflow-hidden transition duration-100 hover:shadow-sm  bg-gray-100   lg:mb-3"
      >


<span    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                    }}
                    className={`${getColorFromType(item.type)} tracking-wide text-xs font-medium`}>{item.type}</span>


        {/* <div
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
              padding: "6px 6px",
              zIndex: "99",
            }}
            className="rounded-lg drop-shadow-md hover:drop-shadow-lg  bg-slate-900  active:text-green-500  transition duration-200 hover:bg-green-100 hover:text-green-600 active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  "
            onClick={() => handleClick("add")}
          >
            <AddIcon />
          </motion.button>

          {quantity > 0 && (
            <div className="" style={{}}>
              <span>
                <motion.button
                whileTap={{ scale: 0.9, type: "spring", bounce: 50 }}
                  style={{
                    padding: "6px 6px",
                    zIndex: "999",
                  }}
                  className="drop-shadow-md relative bg-white rounded-lg active:text-green-500  hover:bg-green-100 hover:text-slate-600  active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-900  "
                  onClick={() => handleClick("remove")}
                >
                  <RemoveIcon />
                </motion.button>
              </span>
              <span className="relative" style={{ margin: "20px", zIndex:'999' }}>{quantity}</span>
            </div>
          )}
        </div> */}
        <Link  to={`/product/${item._id}` } onClick={() => window.scrollTo(0, 0)}>
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
              padding: "6px 6px",
              zIndex: "99",
            }}
            className="rounded-lg drop-shadow-md hover:drop-shadow-lg  bg-slate-900  active:text-green-500  transition duration-200 hover:bg-green-100 hover:text-green-600 active:shadow-none active:bg-white active:text-slate-900 text-sm font-semibold text-slate-50  "
            onClick={() => handleClick("add")}
          >
            <LoginOutlinedIcon />
          </motion.button>
          </div>
          </Link>
        
        <Link  to={`/product/${item._id}`} onClick={() => window.scrollTo(0, 0)}>

          {/* <AnimatePresence>
          {quantity > 0 && (
          <motion.div   initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0}}
          transition={{ duration: 0.2 }}  style={{background: 'rgba(0,0,0,.05)', transition:'ease-in-out .3s '}} className="absolute w-full h-full transition duration-100 backdrop-blur-sm "></motion.div>
          )}
          </AnimatePresence> */}

          <img
            style={{ borderBottom: "1px solid #e5e5e5" , }}
            src={item.img}
            loading="lazy"
            alt="Photo by Austin Wade"
            className="w-full h-full bg-white object-contain hover:shadow-md object-center transition duration-200 "
          />
        </Link>
      </div>

      <div
        className="card_hover"
        style={{
          position: "relative",
          bottom: "0",
          minHeight: "13vh",
          width: "100%",
        }}
      >
        <div
          style={{}}
          className="flex  items-start justify-between gap-2 px-2"
        >
          <div className="flex flex-col">
            <Link to={`/product/${item._id}`}>
              <p className="text-sm font-semibold  text-slate-900 transition duration-100 hover:text-gray-500 lg:text-sm">
                {item.title}
              </p>
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                
              }}
            >
              <ScienceOutlinedIcon style={{fontSize:'18x', marginRight:'3px'}} className="text-slate-500"/>
              <p
                style={{ paddingRight: "5px" }}
                className="text-xs font-base border-r "
              >
                thc: {item.thc}%
              </p>
              <p style={{ paddingLeft: "5px" }} className="text-xs font-base">
                cbd: {item.cbd}%
              </p>
            </div>
            <div>
              <FaceRetouchingNaturalIcon style={{fontSize:'12x', paddingRight:'3px'}} className="text-slate-500"/>
              {item?.effect?.map((effect) => (
                <span className="mb-4 text-gray-500 text-xs" key={effect}>
                  {effect}{" "}
                </span>
              ))}
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
      </div>
            </li>
          ))}
        </ul>
      </div>
      </div>
    </motion.div>
  );
}
