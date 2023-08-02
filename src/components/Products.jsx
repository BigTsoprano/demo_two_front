import Product from "./Product";
import { motion, AnimatePresence } from "framer-motion";

const Products = ({ products }) => {

  const productVariants = {
    hidden: { opacity:0 },
    visible: { opacity: 1 ,
    transition: {duration: 0.5, ease: "linear"}
    },
    exit: {
      opacity: 0,
      transition:{ease: "easeInOut"}
    }
  };

  return (
    <div className="mx-auto  max-w-screen-2xl  ">
      <motion.div  
      
      variants={productVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.map((item) => (
            <motion.div layout key={item._id}>
              <AnimatePresence>
                <Product item={item} />
              </AnimatePresence>
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default Products;
