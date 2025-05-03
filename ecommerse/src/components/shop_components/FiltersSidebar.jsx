// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Tags,
//   ListFilter,
//   IndianRupee,
// } from "lucide-react";
// import * as Slider from "@radix-ui/react-slider";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import globalBackendRoute from "../../config/Config";

// const FiltersSidebar = ({ allProducts, onFilterChange }) => {
//   const [categoriesTree, setCategoriesTree] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [expandedBrands, setExpandedBrands] = useState(false);

//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

//   useEffect(() => {
//     fetchCategoriesAndSubcategories();
//   }, []);

//   useEffect(() => {
//     if (allProducts.length > 0) {
//       fetchBrands();
//       calculatePriceRange();
//     }
//   }, [allProducts]);

//   const fetchCategoriesAndSubcategories = async () => {
//     try {
//       const [catRes, subCatRes] = await Promise.all([
//         axios.get(`${globalBackendRoute}/api/all-categories`),
//         axios.get(`${globalBackendRoute}/api/all-subcategories`),
//       ]);
//       const categories = catRes.data || [];
//       const subcategories = subCatRes.data || [];

//       const tree = categories.map((cat) => ({
//         categoryId: cat._id,
//         categoryName: cat.name.toUpperCase(),
//         subcategories: subcategories
//           .filter((sub) => sub.category?._id === cat._id)
//           .map((sub) => ({
//             id: sub._id,
//             name: sub.subcategory_name.toUpperCase(),
//           })),
//       }));

//       setCategoriesTree(tree);
//     } catch (error) {
//       console.error("Failed to fetch categories/subcategories:", error);
//     }
//   };

//   const fetchBrands = () => {
//     const brandSet = new Set();
//     allProducts.forEach((p) => {
//       if (p.brand && p.brand.trim() !== "") {
//         brandSet.add(p.brand.trim().toUpperCase());
//       }
//     });
//     setBrands([...brandSet]);
//   };

//   const calculatePriceRange = () => {
//     const prices = allProducts
//       .map((p) => p.selling_price ?? p.price ?? 0)
//       .filter((p) => p > 0);

//     if (prices.length === 0) {
//       setMinPrice(0);
//       setMaxPrice(1000);
//       setTempPriceRange([0, 1000]);
//     } else {
//       const minP = Math.floor(Math.min(...prices));
//       const maxP = Math.ceil(Math.max(...prices));
//       setMinPrice(minP);
//       setMaxPrice(maxP);
//       setTempPriceRange([minP, maxP]);
//     }
//   };

//   const applyFilters = () => {
//     let filtered = [...allProducts];
//     if (selectedCategory) {
//       filtered = filtered.filter((p) => p.category?._id === selectedCategory);
//     }
//     if (selectedSubCategory) {
//       filtered = filtered.filter(
//         (p) => p.subcategory?._id === selectedSubCategory
//       );
//     }
//     if (selectedBrands.length > 0) {
//       filtered = filtered.filter((p) =>
//         selectedBrands.includes(p.brand?.toUpperCase())
//       );
//     }
//     filtered = filtered.filter((p) => {
//       const price = p.selling_price ?? p.price ?? 0;
//       return price >= tempPriceRange[0] && price <= tempPriceRange[1];
//     });

//     onFilterChange(filtered);
//   };

//   useEffect(() => {
//     if (allProducts.length > 0) {
//       applyFilters();
//     }
//   }, [selectedCategory, selectedSubCategory, selectedBrands, tempPriceRange]);

//   const handleClearFilters = () => {
//     setSelectedBrands([]);
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//     setTempPriceRange([minPrice, maxPrice]);
//     onFilterChange(allProducts);
//   };

//   const isActive = (id, current) => id === current;

//   return (
//     <motion.div
//       className="w-full rounded-xl space-y-6"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex justify-center">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleClearFilters}
//           className="px-4 py-2 w-full uppercase font-bold bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-full text-sm shadow-md hover:from-red-700 hover:to-red-500"
//         >
//           Clear Filters
//         </motion.button>
//       </div>

//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
//           <ListFilter size={18} /> Categories
//         </div>
//         <div className="space-y-1">
//           {categoriesTree.map((cat, idx) => (
//             <div key={idx}>
//               <div className="flex items-center justify-between text-sm font-medium text-gray-700 uppercase">
//                 <span
//                   className={`cursor-pointer transition font-bold ${
//                     isActive(cat.categoryId, selectedCategory)
//                       ? "text-orange-600"
//                       : "hover:text-black"
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(cat.categoryId);
//                     setSelectedSubCategory(null);
//                   }}
//                 >
//                   {cat.categoryName}
//                 </span>

//                 <motion.span
//                   className="cursor-pointer"
//                   onClick={() =>
//                     setExpandedCategories((prev) => ({
//                       ...prev,
//                       [cat.categoryName]: !prev[cat.categoryName],
//                     }))
//                   }
//                   animate={{
//                     rotate: expandedCategories[cat.categoryName] ? 90 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </motion.span>
//               </div>

//               <AnimatePresence initial={false}>
//                 {expandedCategories[cat.categoryName] && (
//                   <motion.div
//                     className="pl-4 mt-1 space-y-1"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {cat.subcategories.map((subcat, idx2) => (
//                       <div
//                         key={idx2}
//                         className={`text-sm uppercase cursor-pointer transition font-medium ${
//                           isActive(subcat.id, selectedSubCategory)
//                             ? "text-orange-600"
//                             : "text-gray-500 hover:text-black"
//                         }`}
//                         onClick={() => {
//                           setSelectedSubCategory(subcat.id);
//                           setSelectedCategory(null);
//                         }}
//                       >
//                         {subcat.name}
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
//           <Tags size={18} /> Brands
//         </div>
//         <div>
//           <div
//             className="flex items-center justify-between text-sm font-medium text-gray-700 uppercase cursor-pointer"
//             onClick={() => setExpandedBrands((prev) => !prev)}
//           >
//             <span>All Brands</span>
//             {expandedBrands ? <ChevronDown /> : <ChevronRight />}
//           </div>
//           <AnimatePresence>
//             {expandedBrands && (
//               <motion.div
//                 className="pl-4 mt-2 space-y-2"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {brands.map((brand, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex items-center gap-2 uppercase transition font-medium cursor-pointer ${
//                       selectedBrands.includes(brand)
//                         ? "text-orange-600"
//                         : "text-gray-700 hover:text-black"
//                     }`}
//                     onClick={() => {
//                       let updated = [...selectedBrands];
//                       if (updated.includes(brand)) {
//                         updated = updated.filter((b) => b !== brand);
//                       } else {
//                         updated.push(brand);
//                       }
//                       setSelectedBrands(updated);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedBrands.includes(brand)}
//                       readOnly
//                       className="accent-red-500"
//                     />
//                     <span className="text-sm">{brand}</span>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
//           <IndianRupee size={18} /> Price Range
//         </div>

//         <div className="px-2">
//           <Slider.Root
//             className="relative flex items-center select-none touch-none w-full h-5"
//             min={minPrice}
//             max={maxPrice}
//             step={10}
//             value={tempPriceRange}
//             onValueChange={(value) => {
//               if (value.length === 2) {
//                 setTempPriceRange(value);
//               }
//             }}
//           >
//             <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
//               <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
//             </Slider.Track>
//             <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
//             <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
//           </Slider.Root>

//           <div className="text-sm flex justify-between mt-2 text-gray-600 uppercase">
//             <span>₹{tempPriceRange[0]}</span>
//             <span>₹{tempPriceRange[1]}</span>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default FiltersSidebar;

//

// import React, { useState, useEffect } from "react";
// import {
//   ChevronDown,
//   ChevronRight,
//   Tags,
//   ListFilter,
//   IndianRupee,
// } from "lucide-react";
// import * as Slider from "@radix-ui/react-slider";
// import axios from "axios";
// import { motion, AnimatePresence } from "framer-motion";
// import globalBackendRoute from "../../config/Config";

// const FiltersSidebar = ({ allProducts, onFilterChange }) => {
//   const [categoriesTree, setCategoriesTree] = useState([]);
//   const [brands, setBrands] = useState([]);
//   const [expandedCategories, setExpandedCategories] = useState({});
//   const [expandedBrands, setExpandedBrands] = useState(false);

//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedSubCategory, setSelectedSubCategory] = useState(null);

//   const [minPrice, setMinPrice] = useState(0);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

//   useEffect(() => {
//     fetchCategoriesAndSubcategories();
//   }, []);

//   useEffect(() => {
//     if (allProducts.length > 0) {
//       fetchBrands();
//       calculatePriceRange();
//     }
//   }, [allProducts]);

//   const fetchCategoriesAndSubcategories = async () => {
//     try {
//       const [catRes, subCatRes] = await Promise.all([
//         axios.get(`${globalBackendRoute}/api/all-categories`),
//         axios.get(`${globalBackendRoute}/api/all-subcategories`),
//       ]);
//       const categories = catRes.data || [];
//       const subcategories = subCatRes.data || [];

//       const tree = categories.map((cat) => ({
//         categoryId: cat._id,
//         categoryName: cat.name.toUpperCase(),
//         subcategories: subcategories
//           .filter((sub) => sub.category?._id === cat._id)
//           .map((sub) => ({
//             id: sub._id,
//             name: sub.subcategory_name.toUpperCase(),
//           })),
//       }));

//       setCategoriesTree(tree);
//     } catch (error) {
//       console.error("Failed to fetch categories/subcategories:", error);
//     }
//   };

//   const fetchBrands = () => {
//     const brandSet = new Set();
//     allProducts.forEach((p) => {
//       if (p.brand && p.brand.trim() !== "") {
//         brandSet.add(p.brand.trim().toUpperCase());
//       }
//     });
//     setBrands([...brandSet]);
//   };

//   const calculatePriceRange = () => {
//     const prices = allProducts
//       .map((p) => p.selling_price ?? p.price ?? 0)
//       .filter((p) => p > 0);

//     const minP = prices.length ? Math.floor(Math.min(...prices)) : 0;
//     const maxP = prices.length ? Math.ceil(Math.max(...prices)) : 1000;
//     setMinPrice(minP);
//     setMaxPrice(maxP);
//     setTempPriceRange([minP, maxP]);
//   };

//   const applyFilters = () => {
//     let filtered = [...allProducts];
//     if (selectedCategory) {
//       filtered = filtered.filter((p) => p.category?._id === selectedCategory);
//     }
//     if (selectedSubCategory) {
//       filtered = filtered.filter(
//         (p) => p.subcategory?._id === selectedSubCategory
//       );
//     }
//     if (selectedBrands.length > 0) {
//       filtered = filtered.filter((p) =>
//         selectedBrands.includes(p.brand?.toUpperCase())
//       );
//     }
//     filtered = filtered.filter((p) => {
//       const price = p.selling_price ?? p.price ?? 0;
//       return price >= tempPriceRange[0] && price <= tempPriceRange[1];
//     });

//     onFilterChange(filtered);
//   };

//   const handleClearFilters = () => {
//     setSelectedBrands([]);
//     setSelectedCategory(null);
//     setSelectedSubCategory(null);
//     setTempPriceRange([minPrice, maxPrice]);
//     onFilterChange(allProducts); // reset to full list
//   };

//   const isActive = (id, current) => id === current;

//   return (
//     <motion.div
//       className="w-full rounded-xl space-y-6"
//       initial={{ opacity: 0, y: 30 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//     >
//       <div className="flex justify-center">
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleClearFilters}
//           className="px-4 py-2 w-full uppercase font-bold bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-full text-sm shadow-md hover:from-red-700 hover:to-red-500"
//         >
//           Clear Filters
//         </motion.button>
//       </div>

//       {/* Categories */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
//           <ListFilter size={18} /> Categories
//         </div>
//         <div className="space-y-1">
//           {categoriesTree.map((cat, idx) => (
//             <div key={idx}>
//               <div className="flex items-center justify-between text-sm font-medium text-gray-700 uppercase">
//                 <span
//                   className={`cursor-pointer transition font-bold ${
//                     isActive(cat.categoryId, selectedCategory)
//                       ? "text-orange-600"
//                       : "hover:text-black"
//                   }`}
//                   onClick={() => {
//                     setSelectedCategory(cat.categoryId);
//                     setSelectedSubCategory(null);
//                   }}
//                 >
//                   {cat.categoryName}
//                 </span>
//                 <motion.span
//                   className="cursor-pointer"
//                   onClick={() =>
//                     setExpandedCategories((prev) => ({
//                       ...prev,
//                       [cat.categoryName]: !prev[cat.categoryName],
//                     }))
//                   }
//                   animate={{
//                     rotate: expandedCategories[cat.categoryName] ? 90 : 0,
//                   }}
//                   transition={{ duration: 0.3 }}
//                 >
//                   <ChevronRight className="w-4 h-4" />
//                 </motion.span>
//               </div>

//               <AnimatePresence initial={false}>
//                 {expandedCategories[cat.categoryName] && (
//                   <motion.div
//                     className="pl-4 mt-1 space-y-1"
//                     initial={{ height: 0, opacity: 0 }}
//                     animate={{ height: "auto", opacity: 1 }}
//                     exit={{ height: 0, opacity: 0 }}
//                     transition={{ duration: 0.4 }}
//                   >
//                     {cat.subcategories.map((subcat, idx2) => (
//                       <div
//                         key={idx2}
//                         className={`text-sm uppercase cursor-pointer transition font-medium ${
//                           isActive(subcat.id, selectedSubCategory)
//                             ? "text-orange-600"
//                             : "text-gray-500 hover:text-black"
//                         }`}
//                         onClick={() => {
//                           setSelectedSubCategory(subcat.id);
//                           setSelectedCategory(null);
//                         }}
//                       >
//                         {subcat.name}
//                       </div>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Brands */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
//           <Tags size={18} /> Brands
//         </div>
//         <div>
//           <div
//             className="flex items-center justify-between text-sm font-medium text-gray-700 uppercase cursor-pointer"
//             onClick={() => setExpandedBrands((prev) => !prev)}
//           >
//             <span>All Brands</span>
//             {expandedBrands ? <ChevronDown /> : <ChevronRight />}
//           </div>
//           <AnimatePresence>
//             {expandedBrands && (
//               <motion.div
//                 className="pl-4 mt-2 space-y-2"
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{ height: "auto", opacity: 1 }}
//                 exit={{ height: 0, opacity: 0 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {brands.map((brand, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex items-center gap-2 uppercase transition font-medium cursor-pointer ${
//                       selectedBrands.includes(brand)
//                         ? "text-orange-600"
//                         : "text-gray-700 hover:text-black"
//                     }`}
//                     onClick={() => {
//                       let updated = [...selectedBrands];
//                       if (updated.includes(brand)) {
//                         updated = updated.filter((b) => b !== brand);
//                       } else {
//                         updated.push(brand);
//                       }
//                       setSelectedBrands(updated);
//                     }}
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedBrands.includes(brand)}
//                       readOnly
//                       className="accent-red-500"
//                     />
//                     <span className="text-sm">{brand}</span>
//                   </div>
//                 ))}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>

//       {/* Price Range */}
//       <div>
//         <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
//           <IndianRupee size={18} /> Price Range
//         </div>

//         <div className="px-2">
//           <Slider.Root
//             className="relative flex items-center select-none touch-none w-full h-5"
//             min={minPrice}
//             max={maxPrice}
//             step={10}
//             value={tempPriceRange}
//             onValueCommit={(value) => {
//               if (value.length === 2) {
//                 setTempPriceRange(value);
//               }
//             }}
//           >
//             <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
//               <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
//             </Slider.Track>
//             <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
//             <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
//           </Slider.Root>

//           <div className="text-sm flex justify-between mt-2 text-gray-600 uppercase">
//             <span>₹{tempPriceRange[0]}</span>
//             <span>₹{tempPriceRange[1]}</span>
//           </div>
//         </div>
//         <button
//           onClick={applyFilters}
//           className="mt-4 w-full text-sm font-bold bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition"
//         >
//           Apply Filters
//         </button>
//       </div>
//     </motion.div>
//   );
// };

// export default FiltersSidebar;

//

//

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronRight,
  Tags,
  ListFilter,
  IndianRupee,
} from "lucide-react";
import * as Slider from "@radix-ui/react-slider";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import globalBackendRoute from "../../config/Config";

const FiltersSidebar = ({ allProducts, onFilterChange, initialQuery }) => {
  const [categoriesTree, setCategoriesTree] = useState([]);
  const [brands, setBrands] = useState([]);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [expandedBrands, setExpandedBrands] = useState(false);

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [tempPriceRange, setTempPriceRange] = useState([0, 1000]);

  useEffect(() => {
    fetchCategoriesAndSubcategories();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      fetchBrands();
      calculatePriceRange();
    }
  }, [allProducts]);

  useEffect(() => {
    if (
      !initialQuery ||
      allProducts.length === 0 ||
      categoriesTree.length === 0 ||
      brands.length === 0
    )
      return;

    const q = initialQuery.toLowerCase();
    let matched = false;

    for (let cat of categoriesTree) {
      if (cat.categoryName.toLowerCase() === q) {
        setSelectedCategory(cat.categoryId);
        setSelectedSubCategory(null);
        matched = true;
        break;
      }

      for (let sub of cat.subcategories) {
        if (sub.name.toLowerCase() === q) {
          setSelectedSubCategory(sub.id);
          setSelectedCategory(null);
          matched = true;
          break;
        }
      }
    }

    if (!matched) {
      const brandMatch = brands.find((b) => b.toLowerCase() === q);
      if (brandMatch) {
        setSelectedBrands([brandMatch]);
      }
    }
  }, [initialQuery, allProducts, categoriesTree, brands]);

  useEffect(() => {
    applyFilters();
  }, [selectedCategory, selectedSubCategory, selectedBrands, tempPriceRange]);

  const fetchCategoriesAndSubcategories = async () => {
    try {
      const [catRes, subCatRes] = await Promise.all([
        axios.get(`${globalBackendRoute}/api/all-categories`),
        axios.get(`${globalBackendRoute}/api/all-subcategories`),
      ]);
      const categories = catRes.data || [];
      const subcategories = subCatRes.data || [];

      const tree = categories.map((cat) => ({
        categoryId: cat._id,
        categoryName: cat.name.toUpperCase(),
        subcategories: subcategories
          .filter((sub) => sub.category?._id === cat._id)
          .map((sub) => ({
            id: sub._id,
            name: sub.subcategory_name.toUpperCase(),
          })),
      }));

      setCategoriesTree(tree);
    } catch (error) {
      console.error("Failed to fetch categories/subcategories:", error);
    }
  };

  const fetchBrands = () => {
    const brandSet = new Set();
    allProducts.forEach((p) => {
      if (p.brand && p.brand.trim() !== "") {
        brandSet.add(p.brand.trim().toUpperCase());
      }
    });
    setBrands([...brandSet]);
  };

  const calculatePriceRange = () => {
    const prices = allProducts
      .map((p) => p.selling_price ?? p.price ?? 0)
      .filter((p) => p > 0);

    const minP = prices.length ? Math.floor(Math.min(...prices)) : 0;
    const maxP = prices.length ? Math.ceil(Math.max(...prices)) : 1000;
    setMinPrice(minP);
    setMaxPrice(maxP);
    setTempPriceRange([minP, maxP]);
  };

  const applyFilters = () => {
    let filtered = [...allProducts];

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category?._id === selectedCategory);
    }
    if (selectedSubCategory) {
      filtered = filtered.filter(
        (p) => p.subcategory?._id === selectedSubCategory
      );
    }
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) =>
        selectedBrands.includes(p.brand?.toUpperCase())
      );
    }
    filtered = filtered.filter((p) => {
      const price = p.selling_price ?? p.price ?? 0;
      return price >= tempPriceRange[0] && price <= tempPriceRange[1];
    });

    onFilterChange(filtered);
  };

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setTempPriceRange([minPrice, maxPrice]);
    onFilterChange(allProducts);
  };

  const isActive = (id, current) => id === current;

  return (
    <motion.div
      className="w-full rounded-xl space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleClearFilters}
          className="px-4 py-2 w-full uppercase font-bold bg-gradient-to-r from-red-600 to-orange-400 text-white rounded-full text-sm shadow-md hover:from-red-700 hover:to-red-500"
        >
          Clear Filters
        </motion.button>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
          <ListFilter size={18} /> Categories
        </div>
        <div className="space-y-1">
          {categoriesTree.map((cat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm font-medium text-gray-700 uppercase">
                <span
                  className={`cursor-pointer transition font-bold ${
                    isActive(cat.categoryId, selectedCategory)
                      ? "text-orange-600"
                      : "hover:text-black"
                  }`}
                  onClick={() => {
                    setSelectedCategory(cat.categoryId);
                    setSelectedSubCategory(null);
                  }}
                >
                  {cat.categoryName}
                </span>
                <motion.span
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedCategories((prev) => ({
                      ...prev,
                      [cat.categoryName]: !prev[cat.categoryName],
                    }))
                  }
                  animate={{
                    rotate: expandedCategories[cat.categoryName] ? 90 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-4 h-4" />
                </motion.span>
              </div>

              <AnimatePresence initial={false}>
                {expandedCategories[cat.categoryName] && (
                  <motion.div
                    className="pl-4 mt-1 space-y-1"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {cat.subcategories.map((subcat, idx2) => (
                      <div
                        key={idx2}
                        className={`text-sm uppercase cursor-pointer transition font-medium ${
                          isActive(subcat.id, selectedSubCategory)
                            ? "text-orange-600"
                            : "text-gray-500 hover:text-black"
                        }`}
                        onClick={() => {
                          setSelectedSubCategory(subcat.id);
                          setSelectedCategory(null);
                        }}
                      >
                        {subcat.name}
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
          <Tags size={18} /> Brands
        </div>
        <div>
          <div
            className="flex items-center justify-between text-sm font-medium text-gray-700 uppercase cursor-pointer"
            onClick={() => setExpandedBrands((prev) => !prev)}
          >
            <span>All Brands</span>
            {expandedBrands ? <ChevronDown /> : <ChevronRight />}
          </div>
          <AnimatePresence>
            {expandedBrands && (
              <motion.div
                className="pl-4 mt-2 space-y-2"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {brands.map((brand, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2 uppercase transition font-medium cursor-pointer ${
                      selectedBrands.includes(brand)
                        ? "text-orange-600"
                        : "text-gray-700 hover:text-black"
                    }`}
                    onClick={() => {
                      let updated = [...selectedBrands];
                      if (updated.includes(brand)) {
                        updated = updated.filter((b) => b !== brand);
                      } else {
                        updated.push(brand);
                      }
                      setSelectedBrands(updated);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      readOnly
                      className="accent-red-500"
                    />
                    <span className="text-sm">{brand}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Price Range */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-600 uppercase">
          <IndianRupee size={18} /> Price Range
        </div>

        <div className="px-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={tempPriceRange}
            onValueChange={(value) => setTempPriceRange(value)}
          >
            <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-red-500 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-red-500 rounded-full shadow focus:outline-none" />
          </Slider.Root>

          <div className="text-sm flex justify-between mt-2 text-gray-600 uppercase">
            <span>₹{tempPriceRange[0]}</span>
            <span>₹{tempPriceRange[1]}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FiltersSidebar;
