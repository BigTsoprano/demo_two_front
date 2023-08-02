import { useEffect, useState } from "react";
import axios from "axios";


export default function Filters() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    weight: [],
    type: [],
    effect: [],
  });
  const [effects, setEffects] = useState([]);
  const [types, setTypes] = useState([]);
  const [weights, setWeights] = useState([]);
  const [unmatchedFilters, setUnmatchedFilters] = useState(false);
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState(null);
  const [isWeightOpened, setIsWeightOpened] = useState(true);
  const [isTypeOpened, setIsTypeOpened] = useState(true);
  const [isEffectOpened, setIsEffectOpened] = useState(true);
  const [isSortOpened, setIsSortOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const checkState =
    filters.weight.length > 0 ||
    filters.type.length > 0 ||
    filters.effect.length > 0;

  //fetch data
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `https://cart.01ninjas.com/api/products?category=${category}`
            : "https://cart.01ninjas.com/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(er);
      }
    };
    getProducts();
  }, [category]);

  //filters for each filter category
  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
      setEffects([
        ...new Set(
          products
            .map((product) => product.effect)
            .filter((effect) => effect != undefined)
            .flat()
        ),
      ]);
      setTypes([
        ...new Set(
          products
            .map((product) => product.type)
            .filter((effect) => effect != undefined)
            .flat()
        ),
      ]);
      setWeights([
        ...new Set(
          products
            .map((product) => product.weight)
            .filter((effect) => effect != undefined)
            .sort((a, b) => b - a)
            .flat()
        ),
      ]);
    }
  }, [products]);

  //handle filter checkbox
  const handleClick = (e) => {
    if (e.target.checked) {
      if (
        e.target.name === "weight" &&
        !filters.weight.toString().includes(e.target.value)
      ) {
        const baseHolder = products.filter(
          (item) => item.weight == e.target.value
        );
        baseHolder.forEach((product) => {
          setFilters({
            ...filters,
            weight: [...filters.weight, product.weight],
          });
        });
      } else if (
        e.target.name === "type" &&
        !filters.type.toString().includes(e.target.value)
      ) {
        const baseHolder = products.filter(
          (item) => item.type == e.target.value
        );
        baseHolder.forEach((product) => {
          setFilters({
            ...filters,
            type: [...filters.type, product.type],
          });
        });
      } else if (
        e.target.name === "effect" &&
        !filters.effect.toString().includes(e.target.value)
      ) {
        const baseHolder = products.filter((item) =>
          item.effect.includes(e.target.value)
        );
        baseHolder.forEach((product) => {
          setFilters({
            ...filters,
            effect: [...filters.effect, e.target.value],
          });
        });
      }
    } else {
      if (e.target.name === "weight") {
        setFilters({
          ...filters,
          weight: filters.weight.filter(
            (item) => item.toString() != e.target.value
          ),
        });
      }
      if (e.target.name === "type") {
        setFilters({
          ...filters,
          type: filters.type.filter(
            (item) => item.toString() != e.target.value
          ),
        });
      }
      if (e.target.name === "effect") {
        setFilters({
          ...filters,
          effect: filters.effect.filter(
            (item) => item.toString() != e.target.value
          ),
        });
      }
    }
  };

  //apply filters
  const applyFilters = () => {
    if (products && checkState && filters) {
      let updatedList = products;

      if (filters.weight.length > 0) {
        // if (!updatedList.length) return;
        updatedList = updatedList.filter((item) =>
          filters.weight.includes(item.weight)
        );
      }

      if (filters.type.length > 0) {
        updatedList = updatedList.filter((item) =>
          filters.type.some((type) => item.type === type)
        );
      }

      if (filters.effect.length > 0) {
        updatedList = updatedList.filter((item) =>
          filters.effect.every((effect) => item.effect.includes(effect))
        );
        console.log(updatedList);
      }

      setFilteredProducts(updatedList);

      if (updatedList.length < 1) setUnmatchedFilters(true);
      else setUnmatchedFilters(false);
    }
    if (!checkState) {
      setFilteredProducts([]);
    }
  };
  useEffect(() => {
    applyFilters();
  }, [filters]);

  //apply sort
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
      console.log(filteredProducts);
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  const handleRefresh = () => {
    setIsVisible(true);
    setFilters({
      weight: [],
      type: [],
      effect: [],
    });
  };


  const [checked, setChecked] = useState(false)


  return (
    <div
      style={{ display: "flex", alignItems: "baseline" }}
      className="bottom flex  "
    >
      <div className="left border-r bg-white  rounded ">
        <div>
          {weights.length > 0 && (
            <div className="border-t">
              <button
                className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                onClick={() => setIsWeightOpened(!isWeightOpened)}
              >
                <div className="flex items-center text-slate-900 gap-x-2">
                  Weight:
                </div>
                
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 duration-150 ${
                    isWeightOpened ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isWeightOpened ? (
                <ul className="imx-4 px-2  text-sm font-medium">
                  {weights.map((weight) => (
                    <li
                      //   className="checkbox-wrapper-47  columns-2 "
                      className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                      key={weight}
                    >

                      
                      <input
                      
                        type="checkbox"
                        name="weight"
                        id={weight}
                        value={weight}
                        onChange={(e) => handleClick(e)}
                      />
                      <label htmlFor={weight}>{weight}g</label>
                    </li>
                  ))}
                </ul>
                
              ) : (
                ""
              )}
            </div>
          )}
          {types.length > 0 && (
            <div className="border-t">
              <button
                className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                onClick={() => setIsTypeOpened(!isTypeOpened)}
              >
                <div className="flex text-slate-900 items-center gap-x-2">
                  Type:
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 duration-150 ${
                    isTypeOpened ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isTypeOpened ? (
                <ul className="imx-4 px-2  text-sm font-medium">
                  {types.map((type) => (
                    <li
                      //   className="checkbox-wrapper-47  columns-2 "
                      className="flex items-center gap-x-2 text-slate-700 p-2 rounded  hover:bg-green-100 active:bg-gray-100 duration-100"
                      key={type}
                    >
                      
                      <input
                        type="checkbox"
                        name="type"
                        id={type}
                        value={type}
                        onChange={(e) => handleClick(e)}
                      />
                      <label htmlFor={type}>{type}</label>
                      
                    </li>
                    
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          )}
          {effects.length > 0 && (
            <div className="border-t">
              <button
                className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                onClick={() => setIsEffectOpened(!isEffectOpened)}
              >
                <div className="flex items-center text-slate-900 gap-x-2">
                  Effect:
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 duration-150 ${
                    isEffectOpened ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isEffectOpened ? (
                <ul className="imx-4 px-2  text-sm font-medium">
                  {effects.map((effect) => (
                    <li
                      className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                      key={effect}
                    >
                      <input
                        type="checkbox"
                        name="effect"
                        id={effect}
                        value={effect}
                        onChange={(e) => handleClick(e)}
                      />
                      <label htmlFor={effect}>{effect}</label>
                    </li>
                  ))}
                </ul>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
