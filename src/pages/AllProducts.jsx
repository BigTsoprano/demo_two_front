import NavbarTest from "../components/NavbarTest";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Products from "../components/Products";
import "./AllProducts.css";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import "instantsearch.css/themes/satellite.css";
import ClearIcon from '@mui/icons-material/Clear';
import Slider from "@mui/material/Slider";

import Modal from "../components/Modal";
import SearchIcon from "@mui/icons-material/Search";

export default function AllProducts() {
  const [products, setProducts] = useState(null);
  const [products2, setProducts2] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    weight: [],
    type: [],
    effect: [],
  });
  const [displayFilters, setDisplayFilters] = useState([]);
  const [effects, setEffects] = useState([]);
  const [types, setTypes] = useState([]);
  const [weights, setWeights] = useState([]);
  const [unmatchedFilters, setUnmatchedFilters] = useState(false);
  const [sort, setSort] = useState("newest");
  const [category, setCategory] = useState(null);
  const [isWeightOpened, setIsWeightOpened] = useState(true);
  const [isTypeOpened, setIsTypeOpened] = useState(true);
  const [isEffectOpened, setIsEffectOpened] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [showMoreWeight, setShowMoreWeight] = useState(false);
  const [showMoreEffect, setShowMoreEffect] = useState(false);

  const [thc, setThc] = useState([0, 100]);
  const [cbd, setCbd] = useState([0, 100]);

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
        setProducts2(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
    setFilters({
      weight: [],
      type: [],
      effect: [],
    });
  }, [category]);

  //filters for each filter category
  useEffect(() => {
    if (products) {
      //   setFilteredProducts(products);
      setEffects([
        ...new Set(
          products
            .map((product) => product.effect)
            .filter((effect) => effect != undefined)
            .flat()
            // .slice(0, showMoreEffect ? 99 : 7)
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
          products2
            .map((product) => product.weight)
            .filter((effect) => effect != undefined)
            .sort((a, b) => b - a)
            .flat()
            // .slice(0, showMoreWeight ? 99 : 7)
        ),
      ]);
    }
  }, [products, category, showMoreWeight, showMoreEffect]);
  //   console.log(filteredProducts);
  //handle filter checkbox
  const handleClick = (e) => {
    if (e.target.checked) {
      if (
        e.target.name === "weight"
        // &&
        // !filters.weight.toString().includes(e.target.value)
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
        setDisplayFilters((prevState) => [...prevState, e.target.value + "g"]);
      } else if (
        e.target.name === "type"
        // &&
        // !filters.type.toString().includes(e.target.value)
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
        setDisplayFilters((prevState) => [...prevState, e.target.value]);
      } else if (
        e.target.name === "effect"
        // &&
        // !filters.effect.toString().includes(e.target.value)
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
        setDisplayFilters((prevState) => [...prevState, e.target.value]);
      }
    } else {
      if (e.target.name === "weight") {
        setFilters({
          ...filters,
          weight: filters.weight.filter(
            (item) => item.toString() != e.target.value
          ),
        });
        setDisplayFilters(
          displayFilters.filter((item) => item !== e.target.value + "g")
        );
      }
      if (e.target.name === "type") {
        setFilters({
          ...filters,
          type: filters.type.filter(
            (item) => item.toString() != e.target.value
          ),
        });
        setDisplayFilters(
          displayFilters.filter((item) => item !== e.target.value)
        );
      }
      if (e.target.name === "effect") {
        setFilters({
          ...filters,
          effect: filters.effect.filter(
            (item) => item.toString() != e.target.value
          ),
        });
        setDisplayFilters(
          displayFilters.filter((item) => item !== e.target.value)
        );
      }
    }
  };
  //   console.log(displayFilters);

  //thc
  const rangeTHC = (event, newValue) => {
    setThc(newValue);
  };

  //cbd
  const rangeCBD = (event, newValue) => {
    console.log(newValue);
    setCbd(newValue);
    // let filterCbd = products.filter((product) => {
    //   return cbd[0] <= product.cbd && product.cbd <= cbd[1];
    // });

    // setFilteredProducts(filterCbd);
    // if (filterCbd.length < 1) {
    //   setUnmatchedFilters(true);
    // } else setUnmatchedFilters(false);
  };

  //apply filters
  const applyFilters = () => {
    if (products) {
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
      }

      let filterThc = updatedList.filter((product) => {
        return thc[0] <= product.thc && product.thc <= thc[1];
      });

      let filterCbd = filterThc.filter((product) => {
        return cbd[0] <= product.cbd && product.cbd <= cbd[1];
      });
      setFilteredProducts(filterCbd);

      if (updatedList.length < 1) setUnmatchedFilters(true);
      else if (filterThc.length < 1 || filterCbd.length < 1)
        setUnmatchedFilters(true);
      else setUnmatchedFilters(false);
    }
  };
  useEffect(() => {
    applyFilters();
  }, [filters, thc, cbd]);

  //handle display filters
  const handleClickDisplayFilters = (filter) => {
    let node = document.getElementById(filter);
    let checkboxInput = document.getElementById(node.textContent);
    checkboxInput.checked = false;
    if (checkboxInput.name === "weight") {
      setFilters({
        ...filters,
        weight: filters.weight.filter((item) => item != checkboxInput.value),
      });
    } else if (checkboxInput.name === "type") {
      setFilters({
        ...filters,
        type: filters.type.filter((item) => item != checkboxInput.value),
      });
    } else if (checkboxInput.name === "effect") {
      setFilters({
        ...filters,
        effect: filters.effect.filter((item) => item != checkboxInput.value),
      });
    }
    setDisplayFilters(
      displayFilters.filter((item) => item !== node.textContent)
    );
  };
  const handleClearAll = () => {
    setDisplayFilters([]);
    setDisplay(false);
    setFilters({
      weight: [],
      type: [],
      effect: [],
    });
  };

  //apply sort
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
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

  //   const handleRefresh = () => {
  //     setIsVisible(true);
  //     setFilters({
  //       weight: [],
  //       type: [],
  //       effect: [],
  //     });
  //   };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  //reset checkboxes
  const resetCheckbox = (category) => {
    setCategory(category);
    setDisplayFilters([]);
    setDisplay(false);
    setFilters({
      weight: [],
      type: [],
      effect: [],
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 2);
  }, [category, display]);

  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const handleSliderToggle = () => {
    setIsSliderOpen(!isSliderOpen);
  };

  const containerVariants = {
    hidden: { x: "-100%" },
    visible: { x: 0 ,
    transition: {duration: 0.7, delay: 0.3, ease: "linear" }
    },
    exit: {
      x: "-100%",
      transition:{ease: "easeInOut"}
    }
  };

  



  return (
    <div className="bg-white">

      <div
        style={{ display: "flex", alignItems: "baseline",paddingTop:'11vh',marginBottom:'-4rem', paddingBottom:'4rem', minHeight:'120vh' }}
        className="bottom flex  "
      >
        {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
        <motion.div initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      style={{marginTop:'-4rem', paddingTop:'4rem'}}
      className="left border-r bg-white  rounded ">
          <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="filter pb-5 border-b">
            <p
              style={{ display: "flex", alignItems: "flex-end" }}
              className="filter-title"
            >
              <TuneOutlinedIcon
                style={{ fontsize: "16px", paddingRight: "3px" }}
              />

              <span className="filter-title">Filters</span>
              {displayFilters.length > 0 && (
                <span>
                  <span>({displayFilters.length})</span>{" "}
                  <span>
                    <button onClick={handleClearAll}>Clear All</button>
                  </span>
                </span>
              )}
            </p>
          </div>
          <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="py-5 border-b">
            <button
              style={{ width: "80%", padding: "6px", textAlign: "left" }}
              className="search_btn hover:bg-green-100 text-slate-800 text-sm active:border hover:border-indigo-500 bg-slate-100 rounded-lg"
              onClick={handleOpenModal}
            >
              <SearchIcon
                style={{
                  color: "#292929",
                  marginRight: "3px",
                  fontSize: "18px",
                }}
              />{" "}
              Search
            </button>
            
          </div>
          <div  className="flex-col py-3">
            <button
              className="category-name font-semibold  bg-slate-100 hover:bg-green-100 rounded-lg text-slate-900 hover:text-green-600"
              onClick={() => resetCheckbox(null)}
            >
              All
            </button>
            <button
              className="category-name bg-slate-100 font-semibold hover:bg-green-100 rounded-lg  text-slate-900 hover:text-green-600"
              onClick={() => resetCheckbox("flower")}
            >
              Flowers
            </button>
            <button
              className="category-name bg-slate-100 font-semibold hover:bg-green-100 rounded-lg text-slate-900 hover:text-green-600"
              onClick={() => resetCheckbox("edible")}
            >
              Edibles
            </button>
            <button
              className="category-name bg-slate-100 hover:bg-green-100 font-semibold  rounded-lg  text-slate-900 hover:text-green-600"
              onClick={() => resetCheckbox("concentrate")}
            >
              Concentrates
            </button>
            <button
              className="category-name font-semibold hover:bg-green-100  bg-slate-100 rounded-lg  text-slate-900 hover:text-green-600"
              onClick={() => resetCheckbox("pre-roll")}
            >
              Pre-rolls
            </button>
            <button
              className="category-name bg-slate-100 hover:bg-green-100 font-semibold  rounded-lg text-slate-900 hover:text-green-600"
              onClick={() => resetCheckbox("vaporizer")}
            >
              Vapes
            </button>
          </div>
          {display && (
            <div>
              {weights.length > 0 && (
                <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="border-t">
                  <button
                    className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    onClick={() => setIsWeightOpened(!isWeightOpened)}
                  >
                    <div className="flex items-center font-semibold text-sm text-slate-900 gap-x-2">
                      Weight
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
                    <ul className="show_more px-2  text-sm font-base">
                      {weights.map((weight) => (
                        <li
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={weight}
                        >
                          <input
                            style={{ accentColor: "#22C55E" }}
                            checked={displayFilters.includes(weight + "g")}
                            type="checkbox"
                            name="weight"
                            id={weight + "g"}
                            value={weight}
                            onChange={(e) => handleClick(e)}
                          />

                          {/* <label htmlFor={weight}>{weight}g</label> */}

                          <label className={weight + "g"} htmlFor={weight}>
                            {weight}g
                          </label>
                          
                        </li>
                        
                      ))}

                    </ul>
                    
                  ) : (
                    ""
                  )}
              
                </div>
                
              )}
              <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="border-t mt-5">
                <p style={{ paddingTop: "10px", fontWeight: "300" }}>
                  thc: {thc[0]}% - {thc[1]}%
                </p>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  style={{
                    height: 3,
                    width: 200,
                    marginLeft: 0,
                    marginTop: 0,
                    color: "green",
                  }}
                  value={thc}
                  onChange={rangeTHC}
                  // valueLabelDisplay="auto"
                  // getAriaValueText={() => `$`}
                  // color="green"
                  disableSwap
                />
                <p style={{ paddingTop: "20px", fontWeight: "300" }}>
                  CBD: {cbd[0]}% - {cbd[1]}%
                </p>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  style={{
                    height: 3,
                    width: 200,
                    marginLeft: 0,
                    marginTop: 0,
                    color: "green",
                  }}
                  value={cbd}
                  onChange={rangeCBD}
                  // valueLabelDisplay="auto"
                  // getAriaValueText={() => `$`}
                  // color="green"
                  disableSwap
                />
              </div>
              {types.length > 0 && (
                <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="border-t">
                  <button
                    className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    onClick={() => setIsTypeOpened(!isTypeOpened)}
                  >
                    <div className="flex text-sm font-semibold text-slate-900 items-center gap-x-2">
                      Type
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
                    <ul className="imx-4 px-2  text-sm font-base">
                      {types.map((type) => (
                        <li
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded  hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={type}
                        >
                          <input
                            style={{ accentColor: "#22C55E" }}
                            checked={displayFilters.includes(type)}
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
                <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="border-t">
                  <button
                    className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    onClick={() => setIsEffectOpened(!isEffectOpened)}
                  >
                    <div className="flex text-sm font-semibold items-center text-slate-900 gap-x-2">
                      Effect
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
                    <ul className="imx-4 px-2  text-sm font-base">
                      {effects.map((effect) => (
                        <li
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={effect}
                        >
                          
                          <input
                            style={{ accentColor: "#22C55E" }}
                            checked={displayFilters.includes(effect)}
                            type="checkbox"
                            name="effect"
                            id={effect}
                            value={effect}
                            onChange={(e) => handleClick(e)}
                          />
                          <label htmlFor={effect}>{effect}</label>
                        </li>
                      ))}
                      {!showMoreEffect ? (
                        <button onClick={() => setShowMoreEffect(true)}>
                          show more
                        </button>
                      ) : (
                        <button onClick={() => setShowMoreEffect(false)}>
                          show less
                        </button>
                      )}
                    </ul>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          )}
        </motion.div>

        {/* mobile filter */}

        <div className={`slider ${isSliderOpen ? "active" : ""}`}>
          <div className="left2 border-r bg-white  rounded-lg ">
            <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="filter pb-5 border-b">
              <p
                style={{ paddingTop: "12vh", marginLeft: "1rem" }}
                className="filter-title"
              >
                Filter By
              </p>
            </div>
            <div className="py-5 border-b">
              <button
                style={{
                  width: "80%",
                  padding: "6px",
                  textAlign: "left",
                  marginLeft: "6px",
                }}
                className="text-slate-800 hover:bg-green-500 hover:bg-green-100  rounded"
                onClick={handleOpenModal}
              >
                <SearchIcon style={{ color: "#292929", marginRight: "3px" }} />{" "}
                Search
              </button>
              {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
            </div>
            <div className="flex-col">
              <button
                className="category-name  rounded-lg  text-slate-100 "
                onClick={() => resetCheckbox(null)}
              >
                All
              </button>
              <button
                className="category-name border rounded-lg hover:border-green-500 text-slate-900 hover:text-green-600"
                onClick={() => resetCheckbox("flower")}
              >
                Flowers
              </button>
              <button
                className="category-name border rounded-lg hover:border-green-500 text-slate-900 hover:text-green-500"
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
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={weight}
                        >
                          <input
                            style={{ accentColor: "#22C55E" }}
                            checked={displayFilters.includes(weight + "g")}
                            type="checkbox"
                            name="weight"
                            id={weight + "g"}
                            value={weight}
                            onChange={(e) => handleClick(e)}
                          />
                          <label className={weight + "g"} htmlFor={weight}>
                            {weight}g
                          </label>
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
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded  hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={type}
                        >
                          <input
                            style={{ accentColor: "#22C55E" }}
                            checked={displayFilters.includes(type)}
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
                            style={{ accentColor: "#22C55E" }}
                            checked={displayFilters.includes(effect)}
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
            <div style={{ marginTop: "20px" }}>
              <button
                style={{
                  padding: "10px 12px",
                  width: "100%",
                  boxShadow:
                    "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px",
                }}
                onClick={handleSliderToggle}
                className="filter-button text-base text-white bg-green-500 hover:bg-white transition duration-100 hover:text-slate-900 "
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        <div className="right m-5 ">
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="search-sort pb-5 flex w-full justify-between "
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                textAlign: "left",
              }}
              className="category-title px-5"
            >
              {category ? category : "All products"}
            </div>
            <div className="sort absolute right-28">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {/* button for filter mobile */}
                <button
                  style={{ padding: "6px 12px", marginLeft: "2rem" }}
                  className="mobile_btn border hover:border-green-500 text-slate-900 hover:text-green-500 rounded"
                  onClick={handleSliderToggle}
                >
                  Filter <TuneOutlinedIcon style={{ marginLeft: "6px" }} />
                </button>
                {/* button for search modal*/}
                <div>
                  <select
                    name="HeadlineAct"
                    style={{ padding: "10px 12px", marginLeft: "2rem" }}
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded bg-slate-100 text-gray-700 sm:text-sm"
                    onChange={(e) => {
                      const selectedOption = e.target.value;
                      // Perform sorting logic based on selectedOption
                      if (selectedOption === "asc") {
                        setSort("asc");
                        // Perform sorting in ascending order
                      } else if (selectedOption === "desc") {
                        setSort("desc");
                        // Perform sorting in descending order
                      } else if (selectedOption === "clear") {
                        setSort(""); // Clear the sorting value
                      }
                    }}
                  >
                    <option value="clear">Sort price</option>
                    <option value="desc">Price (High to Low)</option>
                    <option value="asc">Price (Low to High)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {displayFilters.length > 0 && (
            <div style={{display:'flex', alignItems:'center'}} className="">
              {displayFilters.map((filter, index) => (
                <span
                
                className="bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 transition duration-150 delay-50 text-xs font-semibold rounded-lg "
                  key={filter}
                  id={index}
                  onClick={() => handleClickDisplayFilters(index)}
                  style={{
                    padding: "5px 8px",
                    margin: ".2rem",
                  }}
                >
                  {filter}
                  <ClearIcon className="" style={{fontSize:'16px ', marginRight:'3px'}}/>
                </span>
              ))}
            </div>
          )}
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
      <Footer />
    </div>
  );
}
