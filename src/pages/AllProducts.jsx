import NavbarTest from "../components/NavbarTest";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Products from "../components/Products";
import "./AllProducts.css";

import { motion, AnimatePresence } from "framer-motion";
import "instantsearch.css/themes/satellite.css";

import Modal from "../components/Modal";
import SearchIcon from "@mui/icons-material/Search";

export default function AllProducts() {
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
  const [display, setDisplay] = useState(false);
  const [uncheck, setUncheck] = useState(false);

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
            ? `http://localhost:5000/api/products?category=${category}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {
        console.log(er);
      }
    };
    getProducts();
    setFilters({
      weight: [],
      type: [],
      effect: [],
    });
    setEffects([0]);
    setWeights([0]);
    setTypes([]);
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
  }, [products, category]);

  //handle filter checkbox
  const handleClick = (e) => {
    console.log(e);
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

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  //   const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  //   const [a, setA] = useState(0);

  //reset checkboxes
  const resetCheckbox = (category) => {
    setCategory(category);
    setDisplay(false);
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 2);
  }, [category]);

  return (
    <div className="bg-white">
      <NavbarTest />

      {/* button for filter mobile */}
      <button
        style={{ padding: "6px 12px", backgroundColor: "green" }}
        className="mobile_btn"
        onClick={handleRefresh}
      >
        dsafasd
      </button>
      {/* button for search modal*/}

      <div
        style={{ display: "flex", alignItems: "baseline" }}
        className="bottom flex  "
      >
        <div className="left border-r bg-white  rounded ">
          <div className="filter pb-5 border-b">
            {/* <div className="text-xl w-40"> */}
            <p className="filter-title">Filter By</p>
            {/* </div> */}
          </div>
          <div className="py-5 border-b">
            <button
              style={{ width: "80%", padding: "6px", textAlign: "left" }}
              className="text-slate-800 hover:border-indigo-500  border rounded"
              onClick={handleOpenModal}
            >
              <SearchIcon style={{ color: "#292929", marginRight: "3px" }} />{" "}
              Search
            </button>
            {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
          </div>
          <div className="flex-col">
            <button
              className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => resetCheckbox(null)}
            >
              All
            </button>
            <button
              className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => resetCheckbox("flower")}
            >
              Flowers
            </button>
            <button
              className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => resetCheckbox("edible")}
            >
              Edibles
            </button>
            <button
              className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => resetCheckbox("concentrate")}
            >
              Concentrates
            </button>
            <button
              className="category-name  border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => resetCheckbox("pre-roll")}
            >
              Pre-rolls
            </button>
            <button
              className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => resetCheckbox("vaporizer")}
            >
              Vaporizers
            </button>
            {/* <button
              className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
              onClick={() => setA(a + 1)}
            >
              reload
            </button> */}
          </div>
          {display && (
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
                            //   checked={uncheck}
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
          )}
        </div>

        {/* mobile filter */}
        <AnimatePresence>
          {isVisible && (
            <motion.div
              className="slider"
              initial={{ x: -300 }}
              animate={{
                x: 0,
              }}
              exit={{ x: -300 }}
              transition={{
                type: "tween",
                bounce: 0,
                duration: 0.2,
                delay: 0,
                ease: "linear",
              }}
            >
              <div className="left2 border-r bg-white  rounded ">
                <div className="filter pb-5 border-b">
                  {/* <div className="text-xl w-40"> */}
                  <p className="filter-title">Filter By</p>
                  {/* </div> */}
                </div>
                <div className="py-5 border-b">
                  <button
                    style={{
                      width: "80%",
                      padding: "6px",
                      textAlign: "left",
                      marginLeft: "6px",
                    }}
                    className="text-slate-800 hover:border-green-500 hover:bg-green-100 border rounded"
                    onClick={handleOpenModal}
                  >
                    <SearchIcon
                      style={{ color: "#292929", marginRight: "3px" }}
                    />{" "}
                    Search
                  </button>
                  {modalOpen && (
                    <Modal closeModal={() => setModalOpen(false)} />
                  )}
                </div>
                <div className="flex-col">
                  <button
                    className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
                    onClick={() => setCategory(null)}
                  >
                    All
                  </button>
                  <button
                    className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
                    onClick={() => setCategory("flower")}
                  >
                    Flowers
                  </button>
                  <button
                    className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
                    onClick={() => setCategory("edible")}
                  >
                    Edibles
                  </button>
                  <button
                    className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
                    onClick={() => setCategory("concentrate")}
                  >
                    Concentrates
                  </button>
                  <button
                    className="category-name  border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
                    onClick={() => setCategory("pre-roll")}
                  >
                    Pre-rolls
                  </button>
                  <button
                    className="category-name border rounded hover:border-green-500 text-slate-900 hover:text-green-500"
                    onClick={() => setCategory("vaporizer")}
                  >
                    Vaporizers
                  </button>
                </div>
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
                <button
                  onClick={() => setIsVisible(!isVisible)}
                  className="filter-button"
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="right m-5 ">
          <div
            style={{ alignItems: "flex-end" }}
            className="search-sort flex w-full justify-between border-b"
          >
            {/* <div className="search">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="items-center justify-center gap-3 sm:flex"
              >
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
                  />
                </div>
                <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow sm:mt-0 sm:w-auto">
                  Search
                </button>
              </form>
            </div> */}
            <div className="category-title px-20 pb-5 flex justify-center items-center">
              {/* <div className="text-xl w-40"> */}
              {category ? category : "All products"}
              {/* </div> */}
            </div>
            {/* <div className="sort">
              <span>Sort Products:</span>
              <select onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="asc">Price (asc)</option>
                <option value="desc">Price (desc)</option>
              </select>
            </div> */}
            <div className="sort absolute right-28">
              <button
                className="w-full flex items-center justify-between text-slate-700 p-2 m-2 border rounded bg-white hover:bg-green-100 duration-150"
                onClick={() => setIsSortOpened(!isSortOpened)}
              >
                <div className="flex items-center text-sm gap-x-2">
                  Sort price
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className={`w-5 h-5 duration-150 ${
                    isSortOpened ? "rotate-180" : ""
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isSortOpened ? (
                <div className="imx-4 px-2 text-sm font-medium relative z-20 bg-white border rounded-lg">
                  {/* <button onClick={setSort('newest')} className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150">
                    Price (High to Low)
                  </button> */}
                  <button
                    onClick={() => setSort("asc")}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-100 active:bg-gray-100 duration-150"
                  >
                    Price (High to Low)
                  </button>
                  <button
                    onClick={() => setSort("desc")}
                    className="flex items-center gap-x-2 text-gray-600 p-2 rounded-lg  hover:bg-gray-100 active:bg-gray-100 duration-150"
                  >
                    Price (Low to High)
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" bg-white sm:py-8 lg:py-10 flex justify-between w-full">
            {unmatchedFilters ? (
              <div>no matched results</div>
            ) : (
              <Products
                products={filteredProducts.length ? filteredProducts : products}
              />
            )}
          </div>
        </div>
      </div>
      {/* <!-- product-grid - end --> */}
    </div>
  );
}
