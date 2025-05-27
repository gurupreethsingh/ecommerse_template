import React, {
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Masonry from "react-masonry-css";
import globalBackendRoute from "../../config/Config";
import one from "../../assets/images/1.jpg";
import two from "../../assets/images/2.jpg";
import three from "../../assets/images/3.jpg";

const carouselSlides = [
  { image: one, title: "Summer Collection 2025" },
  { image: two, title: "Smart Gadgets at Unbeatable Prices" },
  { image: three, title: "New Arrivals Just Dropped!" },
];

const Homepage = () => {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [brandedProducts, setBrandedProducts] = useState([]);
  const [visibleCategories, setVisibleCategories] = useState(0);

  const navigate = useNavigate();
  const categoryCarouselRef = useRef(null);
  const brandProductsCarouselRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, prodRes] = await Promise.all([
          axios.get(`${globalBackendRoute}/api/all-categories`),
          axios.get(`${globalBackendRoute}/api/all-added-products`),
        ]);

        setCategories(catRes.data);

        const allProducts = prodRes.data;
        const shuffled = [...allProducts]
          .sort(() => 0.5 - Math.random())
          .slice(0, 5);
        setFeaturedProducts(shuffled);

        const brandSet = new Set();
        const branded = [];

        for (const p of allProducts) {
          if (p.brand?.trim()) {
            const brand = p.brand.trim().toUpperCase();
            if (!brandSet.has(brand)) brandSet.add(brand);
            branded.push(p);
          }
        }

        setBrands([...brandSet]);
        setBrandedProducts(branded);
      } catch (err) {
        console.error("Homepage Fetch Error:", err);
      }
    };

    fetchData();
  }, []);

  const handleClick = useCallback(
    (name) => navigate(`/search-products?query=${encodeURIComponent(name)}`),
    [navigate]
  );

  const breakpointColumnsObj = useMemo(
    () => ({
      default: 5,
      1100: 3,
      768: 2,
      500: 1,
    }),
    []
  );

  // Calculate visible categories
  useEffect(() => {
    const updateVisibleCategories = () => {
      const el = categoryCarouselRef.current;
      if (el) {
        const containerWidth = el.offsetWidth;
        const itemWidth = 200 + 16; // min-w-[200px] + gap-4 (16px)
        const visibleCount = Math.floor(containerWidth / itemWidth);
        setVisibleCategories(visibleCount);
      }
    };

    updateVisibleCategories();
    window.addEventListener("resize", updateVisibleCategories);
    return () => window.removeEventListener("resize", updateVisibleCategories);
  }, [categories]);

  return (
    <div className="bg-white relative">
      {/* === HERO SLIDER === */}
      <div className="relative">
        <div
          id="carouselExampleDark"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {carouselSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
                data-bs-interval="5000"
              >
                <img
                  src={slide.image}
                  className="d-block w-100 rounded-5"
                  alt={slide.title}
                  loading="lazy"
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
      </div>

      {/* === CATEGORY CAROUSEL === */}
      <section className="py-10 px-4 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-center">
            Explore Our Categories
          </h2>
          <span className="text-sm text-gray-500">
            Showing {Math.min(visibleCategories, categories.length)} of{" "}
            {categories.length} categories
          </span>
        </div>
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            onClick={() => {
              const el = categoryCarouselRef.current;
              if (el) {
                el.scrollBy({ left: -300, behavior: "smooth" });
              }
            }}
          >
            &#10094;
          </button>
          <div
            id="categoryCarousel"
            ref={categoryCarouselRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-2 hide-scrollbar"
          >
            {categories.map((cat, index) => (
              <div
                key={`${cat._id}-${index}`}
                className="min-w-[200px] rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer flex-shrink-0"
                onClick={() => handleClick(cat.category_name)}
              >
                <img
                  src={`${globalBackendRoute}/${cat.category_image}`}
                  alt={cat.category_name}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="text-center bg-black text-white py-2 text-xs sm:text-sm font-semibold uppercase truncate">
                  {cat.category_name}
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
            onClick={() => {
              const el = categoryCarouselRef.current;
              if (el) {
                el.scrollBy({ left: 300, behavior: "smooth" });
              }
            }}
          >
            &#10095;
          </button>
        </div>
      </section>

      {/* === BRANDS SECTION === */}
      <section className="py-10 px-4 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-6">Popular Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              onClick={() => handleClick(brand)}
              className="bg-white p-4 shadow-md rounded-lg hover:bg-orange-100 hover:scale-105 transition cursor-pointer text-center"
            >
              <span
                className="text-xs sm:text-sm md:text-base lg:text-sm font-semibold uppercase text-orange-500 block truncate"
                title={brand}
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* === BRAND PRODUCTS === */}
      {brandedProducts.length > 0 && (
        <section className="mt-16 mb-16 relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-extrabold text-gray-800">
              Explore Products from Popular Brands
            </h2>
            <span className="text-sm text-gray-500">
              Showing {brandedProducts.length} items
            </span>
          </div>
          <div className="relative">
            <button
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full"
              onClick={() => {
                const el = brandProductsCarouselRef.current;
                if (el) {
                  el.scrollBy({ left: -300, behavior: "smooth" });
                }
              }}
            >
              &#10094;
            </button>
            <div
              id="brandProductsCarousel"
              ref={brandProductsCarouselRef}
              className="flex gap-6 overflow-x-auto scroll-smooth px-2 hide-scrollbar"
            >
              {brandedProducts.map((item) => (
                <div
                  key={item._id}
                  className="min-w-[220px] border p-3 rounded shadow hover:shadow-md bg-white flex-shrink-0 cursor-pointer text-center"
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
                    loading="lazy"
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
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white p-2 rounded-full"
              onClick={() => {
                const el = brandProductsCarouselRef.current;
                if (el) {
                  el.scrollBy({ left: 300, behavior: "smooth" });
                }
              }}
            >
              &#10095;
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Homepage;
