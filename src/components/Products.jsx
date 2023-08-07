import Product from "./Product";
import { motion, AnimatePresence } from "framer-motion";
import SkeletonProduct from "./SkeletonProduct";

const Products = ({ products }) => {

  const productVariants = {
   
    exit: {
      scale: .8,
      transition:{ease: "linear"}
    }
  };

  return (
    <div className="product_wrap w-full bg-white grid gap-x-4 gap-y-8 grid-cols-2 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
      


      <AnimatePresence>

      
        {products &&
          products.map((item) => (
            <motion.div    variants={productVariants}       

           
            exit="exit" layout key={item._id}>
              
                <Product item={item} />
            </motion.div>

))}
</AnimatePresence>
{!products && [1,2,3,4,5,6,7,8,9].map((n) => <SkeletonProduct key={n}/>)}

    </div>
  );
};

export default Products;
