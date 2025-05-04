"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Masonry from "react-masonry-css";
import { useNavigate } from "react-router-dom";
import globalBackendRoute from "../../config/Config";
import one from "../../assets/images/1.jpg";
import two from "../../assets/images/2.jpg";
import three from "../../assets/images/3.jpg";

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brandedProducts, setBrandedProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${globalBackendRoute}/api/all-categories`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories", err));

    axios
      .get(`${globalBackendRoute}/api/all-added-products`)
      .then((res) => {
        const allProducts = res.data;
        const shuffled = allProducts.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setFeaturedProducts(selected);

        const brandSet = new Set();
        const branded = [];

        allProducts.forEach((p) => {
          if (p.brand && p.brand.trim() !== "") {
            brandSet.add(p.brand.trim().toUpperCase());
            branded.push(p);
          }
        });

        setBrands([...brandSet]);
        setBrandedProducts(branded);
      })
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  const handleClick = (name) => {
    navigate(`/search-products?query=${encodeURIComponent(name)}`);
  };

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 1,
  };

  return (
    <div className="bg-white relative">
      {/* ========== Inline Custom Styles ========== */}
      <style>{`
        .my-masonry-grid {
          display: flex;
          margin-left: -15px;
          width: auto;
        }
        .my-masonry-grid_column {
          padding-left: 15px;
          background-clip: padding-box;
        }
        .my-masonry-grid_column > div {
          margin-bottom: 15px;
        }
        .carousel-indicators {
          position: absolute;
          bottom: -30px; /* moves below image */
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 0;
        }
        .carousel-indicators [data-bs-target] {
          background-color: black !important;
          width: 40px;
          height: 4px;
          margin: 0 4px;
        }
        .carousel-indicators .active {
          background-color: #f97316 !important; /* Tailwind orange-500 */
        }
      `}</style>

      {/* ========== HERO CAROUSEL ========== */}

      <div className="relative">
        <div
          id="carouselExampleDark"
          className="carousel carousel-dark slide"
          data-bs-ride="carousel"
        >
          {/* Slides */}
          <div className="carousel-inner">
            {[
              {
                image: one,
                title: "Summer Collection 2025",
              },
              {
                image: two,
                title: "Smart Gadgets at Unbeatable Prices",
              },
              {
                image: three,
                title: "New Arrivals Just Dropped!",
              },
            ].map((slide, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                data-bs-interval="5000"
              >
                <img
                  src={slide.image}
                  className="d-block w-100 rounded-5"
                  alt={slide.title}
                  style={{ height: "60vh", objectFit: "cover" }}
                />
                <div className="carousel-caption d-none d-md-block animate__animated animate__fadeInUp">
                  <h5 className="fw-bold bg-white bg-opacity-50 px-4 py-2 rounded text-gray-900">
                    {slide.title}
                  </h5>
                  <a
                    href="/shop"
                    className="inline-block mt-3 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Indicators */}
          <div className="carousel-indicators">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#carouselExampleDark"
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : ""}
                aria-current={idx === 0 ? "true" : "false"}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <button
          className="absolute top-1/2 -left-20 transform -translate-y-1/2 z-50 p-2 md:p-3 rounded-full"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            style={{
              filter:
                "invert(53%) sepia(96%) saturate(749%) hue-rotate(353deg) brightness(101%) contrast(95%)",
            }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="absolute top-1/2 -right-20 transform -translate-y-1/2 z-50 p-2 md:p-3 rounded-full"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            style={{
              filter:
                "invert(53%) sepia(96%) saturate(749%) hue-rotate(353deg) brightness(101%) contrast(95%)",
            }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* ========== CATEGORIES SECTION ========== */}
      {/* <div className="all_categories_image_gallery">
        <div className="bg-white py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Explore Our Categories
          </h2>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleClick(cat.category_name)}
              >
                <img
                  src={`${globalBackendRoute}/${cat.category_image}`}
                  alt={cat.category_name}
                  className="w-full object-cover"
                  style={{
                    height: `${Math.floor(Math.random() * 100 + 200)}px`,
                  }}
                />
                <div className="text-center bg-black text-white py-2 font-semibold uppercase">
                  {cat.category_name}
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div> */}

      <div className="all_categories_image_gallery">
        <div className="bg-white py-10 px-4">
          <h2 className="text-3xl font-bold text-center mb-6">
            Explore Our Categories
          </h2>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {categories.map((cat) => (
              <div
                key={cat._id}
                className="rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => handleClick(cat.category_name)}
              >
                <img
                  src={`${globalBackendRoute}/${cat.category_image}`}
                  alt={cat.category_name}
                  className="w-full h-[250px] object-cover"
                />
                <div className="text-center bg-black text-white py-2 font-semibold uppercase">
                  {cat.category_name}
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>

      {/* ========== BRANDS SECTION ========== */}
      <div className="py-10 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(brand)}
              className="bg-white p-4 shadow-md rounded-lg hover:bg-orange-100 hover:scale-105 transition cursor-pointer text-center font-semibold uppercase text-orange-500"
            >
              {brand}
            </div>
          ))}
        </div>
      </div>

      {brandedProducts.length > 0 && (
        <div className="mt-16 mb-16 relative px-4">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-extrabold mt-3 mb-3 text-gray-800">
              Explore Products from Popular Brands
            </h2>
            <span className="text-sm text-gray-500">
              Showing {brandedProducts.length} items
            </span>
          </div>

          <div className="relative">
            <button
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
              onClick={() => {
                document.getElementById(
                  "brandProductsCarousel"
                ).scrollLeft -= 300;
              }}
            >
              &#10094;
            </button>

            <div
              id="brandProductsCarousel"
              className="flex gap-6 overflow-x-auto scroll-smooth px-2"
              style={{ scrollbarWidth: "none" }}
            >
              {brandedProducts.map((item) => (
                <div
                  key={item._id}
                  className="min-w-[220px] border p-3 rounded shadow hover:shadow-md bg-white flex-shrink-0 cursor-pointer"
                  onClick={() => navigate(`/single-product/${item._id}`)}
                >
                  <img
                    src={
                      item.product_image
                        ? `${globalBackendRoute}/uploads/products/${item.product_image
                            .replace(/\\/g, "/")
                            .split("/")
                            .pop()}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={item.product_name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="mt-2 text-sm font-semibold truncate">
                    {item.product_name}
                  </h4>
                  <p className="text-orange-600 font-bold text-sm">
                    ₹{item.selling_price}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
              onClick={() => {
                document.getElementById(
                  "brandProductsCarousel"
                ).scrollLeft += 300;
              }}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;

// original code.
