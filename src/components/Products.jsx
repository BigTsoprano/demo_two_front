import Product from "./Product";

const Products = ({ products }) => {
  return (
    <div className="mx-auto max-w-screen-2xl px-4 md:px-8 s">
      <div className="grid gap-x-4 gap-y-8 sm:grid-cols-2 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
        {products &&
          products.map((item) => <Product item={item} key={item._id} />)}
      </div>
    </div>
  );
};

export default Products;
