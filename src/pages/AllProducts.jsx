import NavbarTest from "../components/NavbarTest";
import { useEffect, useReducer, useState, useRef } from "react";
import axios from "axios";
import Products from "../components/Products";
import "./AllProducts.css";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import { motion, AnimatePresence } from "framer-motion";
import "instantsearch.css/themes/satellite.css";
import ClearIcon from '@mui/icons-material/Clear';
import Sticky from 'react-stickynode';

import Modal from "../components/Modal";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from 'prop-types';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/joy/Checkbox';
import Done from '@mui/icons-material/Done';


const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: '#22C55E',
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 27,
    width: 27,
    backgroundColor: '#Fff',
    border: '1px solid #0F172A',
    '&:hover': {
      boxShadow: 'none',
    },
    '& .airbnb-bar': {
      height: 10,
      width: 1,
      backgroundColor: 'currentColor',
      marginLeft: 1,
      marginRight: 1,
    },
  },
  '& .MuiSlider-track': {
    height: 3,
  },
  '& .MuiSlider-rail': {
    color: theme.palette.mode === 'dark' ? '#bfbfbf' : '#d8d8d8',
    opacity: theme.palette.mode === 'dark' ? undefined : 1,
    height: 3,
  },
}));

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar text-slate-900" />
      <span className="airbnb-bar text-slate-900" />
      <span className="airbnb-bar text-slate-900" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

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
            ? `https://cart.01ninjas.com/api/products?category=${category}`
            : "https://cart.01ninjas.com/api/products"
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
         setFilteredProducts(products);
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
  }, [products]);
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
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setTimeout(() => {
      setDisplay(true);
    }, 2);
  }, [category, display]);

  const [isSliderOpen, setIsSliderOpen] = useState(false);

  const handleSliderToggle = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
        setIsSliderOpen(!isSliderOpen);
    
  };
  const sidebarRef = useRef();

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
    <div className="all_product_section bg-white flex ">

      <div
       
        className="bottom relative flex  "
      >
        {modalOpen && <Modal closeModal={() => setModalOpen(false)} />}
       
        <motion.div initial="hidden"
      animate="visible"
      exit="exit"
      variants={containerVariants}
      ref={sidebarRef}
      className={`left ${isSliderOpen ? "active" : ""}`}>
          

              {displayFilters.length > 0 && (
             <button  onClick={handleClearAll} className="relative m-2 overflow-hidden group"><span className="invisible w-full">filter Refinement clear</span><span className="absolute top-0 left-0 text-slate-900 py-1 group-hover:-translate-y-full text-sm transition-transform ease-in-out duration-500 hover:duration-300">Filter(s)<span className="filter_btn bg-white ml-1 text-sm py-1 px-2 rounded-lg">{displayFilters.length}</span></span><span className="absolute top-0 left-0 translate-y-full group-hover:translate-y-0 transition-transform ease-in-out duration-500 text-sm font-medium hover:duration-300">Clear all</span></button>
                
              )}
          <div className="py-1 pl-8 -ml-8">
            
            <button
              className="search_btn py-2 hover:bg-green-100 text-slate-800  text-sm active:border hover:border-indigo-500 bg-white rounded-lg"
              onClick={handleOpenModal}
            >
              <SearchIcon
              className="text-slate-600 mr-2 text-sm"
           
              />{" "}
              Search
            </button>
            
          </div>
          <div  className="flex-col py-3">
            <p className="p-2 text-sm font-medium">Categories</p>
            <button
              className="category-name font-medium  bg-white hover:bg-green-100 rounded-lg text-slate-700 hover:text-slate-900"
              onClick={() => resetCheckbox(null)}
            >
              All
            </button>
            <button
              className="category-name bg-white font-medium hover:bg-green-100 rounded-lg  text-slate-700 hover:text-slate-900"
              onClick={() => resetCheckbox("flower")}
            >
              Flowers
            </button>
            <button
              className="category-name bg-white font-medium hover:bg-green-100 rounded-lg text-slate-700 hover:text-slate-900"
              onClick={() => resetCheckbox("edible")}
            >
              Edibles
            </button>
            <button
              className="category-name bg-white hover:bg-green-100 font-medium  rounded-lg  text-slate-700 hover:text-slate-900"
              onClick={() => resetCheckbox("concentrate")}
            >
              Concentrates
            </button>
            <button
              className="category-name font-medium hover:bg-green-100  bg-white rounded-lg  text-slate-700 hover:text-slate-900"
              onClick={() => resetCheckbox("pre-roll")}
            >
              Pre-rolls
            </button>
            <button
              className="category-name bg-white hover:bg-green-100 font-medium rounded-lg text-slate-700 hover:text-slate-900"
              onClick={() => resetCheckbox("vaporizer")}
            >
              Vapes
            </button>
          </div>
          {display && (
            <div>
              {weights.length > 0 && (
                <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="">
                  <button
                    className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    onClick={() => setIsWeightOpened(!isWeightOpened)}
                  >
                    <div className="flex items-center font-medium text-sm text-slate-900 gap-x-2">
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
                    <ul className={`${showMoreWeight? `show_more`:``}show_more px-2  text-sm font-base`}>
                      {weights.map((weight) => (
                        <li
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={weight}
                        >
                         
                         <Checkbox
                                uncheckedIcon={<Done className="p-1"/>}
                                slotProps={{
                                  root: ({ checked, focusVisible }) => ({
                                    sx: !checked
                                      ? {
                                          '& svg': { opacity: focusVisible ? 1 : 0 },
                                          '&:hover svg': {
                                            opacity: 1,
                                          },
                                        }
                                      : undefined,
                                  }),
                                }}
                          
                          className="border border-slate-300 rounded"
                          variant="plain"
                          size="sm"
                          color="success"
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
                  {(weights.length > 5 && isWeightOpened) ? 
                   <button onClick={() => setShowMoreWeight(!showMoreWeight)}
      id="showMore" // Give the button an id so we can target it in CSS
      className="relative ml-3 after:absolute after:bg-slate-400 text-xs text-slate-500 after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300"
      style={{ }}
    >
      {showMoreWeight ? "show less" : "show more"}
    </button>
    : "" }
    
    

    
                </div>
                
              )}
              <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className=" mt-5">
                <p style={{marginRight:'1rem'}} className="text-sm pt-2 font-medium">Potency</p>
               <div style={{marginLeft:'1rem'}}>
                <p className="text-sm text-slate-800 p-1 mb-1 font-base" style={{ paddingTop: "10px",}}>
                  thc: {thc[0]}% - {thc[1]}%
                </p>
                <AirbnbSlider
        slots={{ thumb: AirbnbThumbComponent }}
                size='small'
                valueLabelDisplay="auto"
                className="text-slate-900"

                  getAriaLabel={() => "Minimum distance"}
                  style={{
                    height: 3,
                    width: '85%',
                    marginLeft: 0,
                    marginTop: 0,
                    
                   
                  }}
                  value={thc}
                  onChange={rangeTHC}
                  // valueLabelDisplay="auto"
                  // getAriaValueText={() => `$`}
                  // color="green"
                  disableSwap
                />
                <div>
                <p 
                
                className="text-sm rounded-lg  text-slate-800 mb-1 font-base" style={{ padding: "5px", width:'fit-content',}}>
                  cbd: {cbd[0]}% - {cbd[1]}%
                </p>
                </div>
                 <AirbnbSlider
        slots={{ thumb: AirbnbThumbComponent }}
                size="small"
                valueLabelDisplay="auto"

                  getAriaLabel={() => "Minimum distance"}
                  style={{
                    height: 3,
                    width: '85%',
                    marginLeft: 0,
                    marginTop: 0,
                    color: "#22C55E",
                

                  }}
                  value={cbd}
                  onChange={rangeCBD}
                  // valueLabelDisplay="auto"
                  // getAriaValueText={() => `$`}
                  // color="green"
                  disableSwap
                />
                </div>
              </div>
              {types.length > 0 && (
                <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="">
                  <button
                    className="w-full flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    onClick={() => setIsTypeOpened(!isTypeOpened)}
                  >
                    <div className="flex text-sm font-medium text-slate-900 items-center gap-x-2">
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
                         
                         <Checkbox
                                uncheckedIcon={<Done className="p-1"/>}
                                slotProps={{
                                  root: ({ checked, focusVisible }) => ({
                                    sx: !checked
                                      ? {
                                          '& svg': { opacity: focusVisible ? 1 : 0 },
                                          '&:hover svg': {
                                            opacity: 1,
                                          },
                                        }
                                      : undefined,
                                  }),
                                }}
                          
                          className="border border-slate-300 rounded"
                          variant="plain"
                          size="sm"
                          color="success"
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
                <div style={{paddingLeft:'2rem', marginLeft:'-2rem'}} className="pb-10">
                  <button
                    className="w-full  flex items-center justify-between text-gray-600 p-2 rounded-lg  hover:bg-gray-50 active:bg-gray-100 duration-150"
                    onClick={() => setIsEffectOpened(!isEffectOpened)}
                  >
                    <div className="flex text-sm font-medium items-center text-slate-900 gap-x-2">
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
                    <ul className={`${showMoreEffect? `show_show`:``}show_show px-2 pb-12 text-sm font-base`}>
                      {effects.map((effect) => (
                        <li
                          className="flex items-center gap-x-2 text-slate-700 p-2 rounded hover:bg-green-100 active:bg-gray-100 duration-100"
                          key={effect}
                        >
                          
                          <Checkbox
                                uncheckedIcon={<Done className="p-1"/>}
                                slotProps={{
                                  root: ({ checked, focusVisible }) => ({
                                    sx: !checked
                                      ? {
                                          '& svg': { opacity: focusVisible ? 1 : 0 },
                                          '&:hover svg': {
                                            opacity: 1,
                                          },
                                        }
                                      : undefined,
                                  }),
                                }}
                          
                          className="border border-slate-300 rounded"
                          variant="plain"
                          size="sm"
                          color="success"
                            style={{  }}
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
                      {(effects.length > 5 && isEffectOpened) ?
                     <button onClick={() => setShowMoreEffect(!showMoreEffect)}
                     className="relative ml-2 after:absolute after:bg-slate-400 text-xs text-slate-500 after:bottom-0 after:left-0 after:h-[1px] after:w-full after:origin-bottom-left after:scale-x-100 hover:after:origin-bottom-right hover:after:scale-x-0 after:transition-transform after:ease-in-out after:duration-300"
                     style={{ borderTop: "none" }}
    >
      {showMoreEffect ? "show less" : "show more"}
    </button>
    : "" }
  
                    </ul>
                    
                  ) : (
                    ""
                  )}
                    <button
                style={{
                  padding: "10px 12px",
                  width: "96%",

                  
                  
                }}
                onClick={handleSliderToggle}
                className="filter-button rounded-lg text-base text-white mb-3 bg-green-500 hover:bg-white hover:border transition duration-100 hover:text-slate-900 "
              >
                Apply
              </button>
                </div>
              )}
              
            </div>
          )}
        </motion.div>

        {/* mobile filter */}

       

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
                  style={{ padding: "8px 12px", marginLeft: "2rem" }}
                  className="mobile_btn bg-white hover:bg-green-100  font-medium text-slate-900 hover:bg-green-100 rounded-lg"
                  onClick={handleSliderToggle}
                >
            <TuneOutlinedIcon style={{ marginRight: "6px" }} />      Filter 
                </button>
                {/* button for search modal*/}
                <div>
                  <select
                    name="HeadlineAct"
                    style={{ padding: "10px 12px", marginLeft: "2rem" }}
                    id="HeadlineAct"
                    className="mt-1.5 w-full rounded-lg bg-white border  text-gray-700 sm:text-sm"
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
          <div className=" bg-white sm:py-8 lg:py-3 flex justify-between w-full">
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
    </div>
  );
}
