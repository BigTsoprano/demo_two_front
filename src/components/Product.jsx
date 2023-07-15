import { Link } from "react-router-dom";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';

const Product = ({ item }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log(item);
    dispatch(addProduct({ ...item, quantity: 1 }));
  };
  return (
    
    <div className="product  bg-white rounded border hover:border-green-500 hover:bg-green-100">
      
      <div  className="group relative mb-2 block h-56 overflow-hidden rounded bg-gray-100  lg:mb-3">
     
      <Link
        to={`/product/${item._id}`}
       
      > 
        <img
        style={{borderBottom: '1px solid #e5e5e5'}}
          src={item.img}
          loading="lazy"
          alt="Photo by Austin Wade"
          className="h-full w-full bg-white object-contain shadow-0 object-center transition duration-200 group-hover:scale-110"
        />
      </Link>
      </div>
<div style={{position:'relative', bottom:'0', height:'12vh', width:'100%'}}>
      <div className="flex items-start justify-between gap-2 px-2">
        <div className="flex flex-col">
          <span className="text-green-600 text-sm">{item.type}</span>
          <Link
            to={`/product/${item._id}`}
            className="text-sm font-sm text-gray-800 transition duration-100 hover:text-gray-500 lg:text-sm"
          >
            {item.title}
          </Link>
        </div>

        <div className="flex flex-col items-end">
          <span className="font-bold text-sm text-gray-600 lg:text-sm">
            ${item.price}
          </span>
          {/* <span className="text-sm text-red-500 line-through">$39.99</span> */}
        </div>
      </div>
      <button
      style={{position:'absolute', bottom:'10px',right:"10px", padding:'6px 6px',zIndex:'100', borderRadius:'35px'}}
        className="rounded bg-green-500 hover:shadow-md text-sm font-semibold text-slate-50  "
        onClick={handleClick}
      >
<ShoppingCartCheckoutIcon/>
      </button>
    
      </div>
    </div>
    // </Container>
  );
};

export default Product;
