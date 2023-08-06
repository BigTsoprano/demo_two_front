import Product from "./Product";
import { motion, AnimatePresence } from "framer-motion";

const Products = ({ products }) => {

  const productVariants = {
    hidden: { opacity:0 },
    visible: { opacity: 1 ,
    transition: {duration: 0.3, ease: "linear"}
    },
    exit: {
      opacity: 0,
      transition:{ease: "linear"}
    }
  };

  return (
    <div className="product_wrap bg-white grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      
      <AnimatePresence>

      
        {products &&
          products.map((item) => (
            <motion.div    variants={productVariants}       

            initial="hidden"
            animate="visible"
            exit="exit" layout key={item._id}>
              
                <Product item={item} />
            </motion.div>

))}
</AnimatePresence>
    </div>
  );
};

export default Products;
