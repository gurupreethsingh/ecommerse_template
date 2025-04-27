import React, { useState, useEffect } from "react";
import { FaTags, FaList, FaChevronDown, FaChevronRight } from "react-icons/fa";
import * as Slider from "@radix-ui/react-slider";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const FiltersSidebar = ({ allProducts, onFilterChange }) => {
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
        categoryName: cat.name,
        subcategories: subcategories
          .filter((sub) => sub.category?._id === cat._id)
          .map((sub) => ({ id: sub._id, name: sub.subcategory_name })),
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
        brandSet.add(p.brand.trim());
      }
    });
    setBrands([...brandSet]);
  };

  const calculatePriceRange = () => {
    const prices = allProducts
      .map((p) => p.selling_price ?? p.price ?? 0)
      .filter((p) => p > 0);

    if (prices.length === 0) {
      setMinPrice(0);
      setMaxPrice(1000);
      setTempPriceRange([0, 1000]);
    } else {
      const minP = Math.floor(Math.min(...prices));
      const maxP = Math.ceil(Math.max(...prices));
      setMinPrice(minP);
      setMaxPrice(maxP);
      setTempPriceRange([minP, maxP]);
    }
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
      filtered = filtered.filter((p) => selectedBrands.includes(p.brand));
    }
    filtered = filtered.filter((p) => {
      const price = p.selling_price ?? p.price ?? 0;
      return price >= tempPriceRange[0] && price <= tempPriceRange[1];
    });

    onFilterChange(filtered);
  };

  useEffect(() => {
    if (allProducts.length > 0) {
      applyFilters();
    }
  }, [selectedCategory, selectedSubCategory, selectedBrands, tempPriceRange]);

  const handleClearFilters = () => {
    setSelectedBrands([]);
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    setTempPriceRange([minPrice, maxPrice]);
    onFilterChange(allProducts);
  };

  return (
    <div className="w-full md:w-64 p-4 border-r bg-white rounded-lg shadow-sm space-y-6 animate-fadeIn">
      {/* Clear Filters */}
      <div className="flex justify-center">
        <button
          onClick={handleClearFilters}
          className="px-3 py-2 w-full font-bold bg-gray-900 text-white rounded-pill text-xs hover:bg-red-600 transition"
        >
          Clear Filters
        </button>
      </div>

      {/* Categories */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-500">
          <FaList /> Categories
        </div>
        <div className="space-y-1">
          {categoriesTree.map((cat, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between text-sm font-medium text-gray-700">
                <span
                  className="cursor-pointer hover:text-black"
                  onClick={() => {
                    setSelectedCategory(cat.categoryId);
                    setSelectedSubCategory(null);
                  }}
                >
                  {cat.categoryName}
                </span>
                <span
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedCategories((prev) => ({
                      ...prev,
                      [cat.categoryName]: !prev[cat.categoryName],
                    }))
                  }
                >
                  {expandedCategories[cat.categoryName] ? (
                    <FaChevronDown />
                  ) : (
                    <FaChevronRight />
                  )}
                </span>
              </div>
              {expandedCategories[cat.categoryName] && (
                <div className="pl-4 mt-1 space-y-1">
                  {cat.subcategories.map((subcat, idx2) => (
                    <div
                      key={idx2}
                      className="text-sm text-gray-500 hover:text-black cursor-pointer"
                      onClick={() => {
                        setSelectedSubCategory(subcat.id);
                        setSelectedCategory(null);
                      }}
                    >
                      {subcat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div>
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-600">
          <FaTags /> Brands
        </div>
        <div>
          <div
            className="flex items-center justify-between text-sm font-medium text-gray-700 cursor-pointer"
            onClick={() => setExpandedBrands((prev) => !prev)}
          >
            <span>All Brands</span>
            {expandedBrands ? <FaChevronDown /> : <FaChevronRight />}
          </div>
          {expandedBrands && (
            <div className="pl-4 mt-1 space-y-2">
              {brands.map((brand, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => {
                      let updated = [...selectedBrands];
                      if (updated.includes(brand)) {
                        updated = updated.filter((b) => b !== brand);
                      } else {
                        updated.push(brand);
                      }
                      setSelectedBrands(updated);
                    }}
                    className="accent-red-500"
                  />
                  <span className="text-sm">{brand}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-2 font-semibold text-red-600">
          <FaTags /> Price Range
        </div>

        <div className="px-2">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={minPrice}
            max={maxPrice}
            step={10}
            value={tempPriceRange}
            onValueChange={(value) => {
              if (value.length === 2) {
                setTempPriceRange(value);
              }
            }}
          >
            <Slider.Track className="bg-gray-300 relative grow rounded-full h-2">
              <Slider.Range className="absolute bg-gray-900 rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-500 rounded-full focus:outline-none" />
            <Slider.Thumb className="block w-5 h-5 bg-white border-2 border-gray-500 rounded-full focus:outline-none" />
          </Slider.Root>

          <div className="text-sm flex justify-between mt-2 text-gray-500">
            <span>₹{tempPriceRange[0]}</span>
            <span>₹{tempPriceRange[1]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FiltersSidebar;
