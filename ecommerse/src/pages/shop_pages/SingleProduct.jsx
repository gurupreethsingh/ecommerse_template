import React, {
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaStar,
  FaCartPlus,
  FaRupeeSign,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { toast } from "react-toastify";
import { CartContext } from "../../components/cart_components/CartContext";
import { FaAmazonPay } from "react-icons/fa6";
import { MdFindReplace } from "react-icons/md";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbBrandBeats } from "react-icons/tb";
import { PiAppleLogoThin } from "react-icons/pi";

const SingleProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({});
  const [randomNum] = useState(Math.floor(Math.random() * 250) + 1);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState([]);

  const getImageUrl = useCallback((img) => {
    if (!img) return "https://via.placeholder.com/150";
    const fileName = img.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${fileName}`;
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
        );
        setProduct(res.data);
        setMainImage(res.data.product_image);

        if (res.data?.category?._id) {
          const catId = res.data.category._id;
          const productsRes = await axios.get(
            `${globalBackendRoute}/api/get-products-by-category/${catId}`
          );
          setCategoryProducts(
            productsRes.data.filter((p) => p._id !== res.data._id)
          );
        }
      } catch (error) {
        console.error("Failed to load product:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const images = useMemo(
    () => [product?.product_image, ...(product?.all_product_images || [])],
    [product]
  );

  const handleZoom = useCallback(
    (e) => {
      const { offsetX, offsetY, target } = e.nativeEvent;
      const { offsetWidth, offsetHeight } = target;
      const x = (offsetX / offsetWidth) * 100;
      const y = (offsetY / offsetHeight) * 100;
      setZoomStyle({
        backgroundImage: `url(${getImageUrl(mainImage)})`,
        backgroundPosition: `${x}% ${y}%`,
        backgroundSize: "200%",
      });
    },
    [mainImage, getImageUrl]
  );

  const handleAddToCart = useCallback(() => {
    if (product?.availability_status) {
      addToCart({ ...product, quantity });
    } else {
      toast.error("Out of Stock");
    }
  }, [product, quantity, addToCart]);

  const changeQuantity = useCallback((type) => {
    setQuantity((prev) =>
      type === "inc" ? prev + 1 : prev > 1 ? prev - 1 : 1
    );
  }, []);

  const handleBuyNow = () => {
    if (!product?.availability_status) {
      toast.error("Out of Stock");
      return;
    }
    addToCart({ ...product, quantity }); // adds to cart
    navigate("/checkout"); // redirects to checkout
  };

  if (!product) {
    return (
      <div className="text-center text-xl text-gray-500 py-20">Loading...</div>
    );
  }

  return (
    <div className="py-10 px-4 space-y-12">
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          <div>
            {/* Image section: thumbnails + main image in a row */}
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 max-h-[400px] overflow-hidden">
                {images.slice(0, 6).map((img, idx) => (
                  <img
                    key={idx}
                    src={getImageUrl(img)}
                    alt={`thumb-${idx}`}
                    onClick={() => setMainImage(img)}
                    className="w-14 h-14 object-cover rounded border cursor-pointer hover:scale-105 transition duration-200"
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 bg-white rounded shadow-md flex justify-center items-center">
                <div
                  onMouseMove={handleZoom}
                  onMouseLeave={() => setZoomStyle({})}
                  className="w-full h-[300px] md:h-[400px] bg-no-repeat bg-center bg-contain"
                  style={
                    Object.keys(zoomStyle).length > 0
                      ? zoomStyle
                      : {
                          backgroundImage: `url(${getImageUrl(mainImage)})`,
                          backgroundSize: "contain",
                        }
                  }
                />
              </div>
            </div>
            <p className="text-sm text-center text-blue-700 mt-4">
              roll over the image to zoom
            </p>
          </div>

          {/* Icons below the image section */}
          <div className="flex justify-evenly flex-wrap gap-4">
            {[
              {
                icon: <FaAmazonPay className="h-10 w-10 text-yellow-500" />,
                label: "Cash/Pay on Delivery",
              },
              {
                icon: <MdFindReplace className="h-10 w-10 text-rose-600" />,
                label: "Replacement Available",
              },
              {
                icon: <CiDeliveryTruck className="h-10 w-10 text-green-500" />,
                label: "Delivery Partner",
              },
              {
                icon: <TbBrandBeats className="h-10 w-10 text-blue-500" />,
                label: "Brand Installation",
              },
              {
                icon: <PiAppleLogoThin className="h-10 w-10 text-purple-500" />,
                label: "Top Brands",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center"
                title={item.label}
              >
                {item.icon}
                <p className="text-sm text-center mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-4xl font-bold text-gray-900">
            {product.product_name}
          </h1>
          <div>
            <p
              className={`text-gray-700 ${
                showFullDesc ? "" : "line-clamp-3"
              } transition-all`}
            >
              {product.description}
            </p>
            {product.description.length > 100 && (
              <button
                className="text-blue-600 font-semibold text-sm"
                onClick={() => setShowFullDesc(!showFullDesc)}
              >
                {showFullDesc ? "Show Less" : "Read More"}
              </button>
            )}
          </div>

          <p>
            <span className="font-extrabold text-xl">Brand: </span>
            <span className="text-blue-500">{product.brand}</span>
          </p>

          <p>
            <span className="font-extrabold text-xl">Category: </span>
            <span className="text-blue-500">
              {product.category?.category_name}
            </span>
          </p>

          <div>
            <p>
              <strong>{randomNum}+ bought</strong> in past month.
            </p>
            <hr className="text-orange-600 " />
            <div className="bg-red-600 inline-block text-white font-bold p-1 rounded mt-1">
              Summer Sale
            </div>
          </div>

          <div className="flex items-center gap-1 text-orange-500">
            {[...Array(5)].map((_, idx) => (
              <FaStar
                key={idx}
                className={`w-5 h-5 ${
                  idx < Math.round(product.avg_rating)
                    ? "text-orange-500"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.total_reviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-gray-900 flex items-center">
              <FaRupeeSign /> {product.selling_price}
            </h2>
            {product.display_price && (
              <span className="text-lg line-through text-red-300 flex items-center">
                <FaRupeeSign /> {product.display_price}
              </span>
            )}
          </div>
          <small className="text-blue-900">
            M.R.P :{" "}
            <del>Rs. {product.selling_price + product.selling_price * 0.5}</del>
          </small>
          <p className="text-sm">Inclusive of all taxes</p>

          {/* Quantity */}
          <div className="flex items-center gap-3 mt-4">
            <span className="text-sm text-gray-600">Qty:</span>
            <button
              onClick={() => changeQuantity("dec")}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              onClick={() => changeQuantity("inc")}
              className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
            >
              <FaPlus />
            </button>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-bold text-lg flex items-center gap-2 hover:opacity-90"
            >
              <FaCartPlus /> Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-full font-bold text-lg flex items-center gap-2 hover:opacity-90"
            >
              <FaCartPlus /> Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Icons */}

      {/* Specs & Delivery */}
      <div className="grid md:grid-cols-2 gap-12 bg-white p-6">
        <div>
          <h2 className="font-bold text-lg mb-3 text-orange-600">
            Product Technical Information
          </h2>
          <ul className="text-gray-700 space-y-1">
            <li className="border-b flex justify-between">
              <strong>PRODUCT NAME:</strong> <span>{product.product_name}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>SKU:</strong> <span>{product.sku}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Brand:</strong> <span>{product.brand}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Color:</strong> <span>{product.color}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Material:</strong> <span>{product.material}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Barcode:</strong> <span>{product.barcode}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Dimensions:</strong>{" "}
              <span>
                {product.dimensions?.length} x {product.dimensions?.width} x{" "}
                {product.dimensions?.height} cm
              </span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Stock Available:</strong> <span>{product.stock}</span>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Additional Information</h2>
          <ul className="text-gray-700 space-y-1 mb-3">
            <li className="border-b flex justify-between">
              <strong>Manufacturer:</strong> <span>{product.product_name}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Outlet Code:</strong> <span>{product.outlet}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Category:</strong>{" "}
              <span>{product.category?.category_name}</span>
            </li>
          </ul>
          <h2 className="font-bold text-lg mb-3">Delivery & Returns</h2>
          <ul className="text-gray-700 space-y-1">
            <li className="border-b flex justify-between">
              <strong>Delivery Estimate:</strong>{" "}
              <span>{product.delivery_time_estimate}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Replacement Policy:</strong>{" "}
              <span>{product.replacement_policy}</span>
            </li>
            <li className="border-b flex justify-between">
              <strong>Country of Origin:</strong>{" "}
              <span>{product.origin_country}</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Related Products */}
      {categoryProducts.length > 0 && (
        <div className="mt-16 relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-extrabold mt-3 mb-3">
              Explore More from This Category
            </h2>
            <span className="text-sm text-gray-500">
              Showing {categoryProducts.length} items
            </span>
          </div>

          <div className="relative">
            <button
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
              onClick={() => {
                document.getElementById("catCarousel").scrollLeft -= 300;
              }}
            >
              &#10094;
            </button>

            <div
              id="catCarousel"
              className="flex gap-6 overflow-x-auto scroll-smooth px-2"
              style={{ scrollbarWidth: "none" }}
            >
              {categoryProducts.map((item) => (
                <Link
                  key={item._id}
                  to={`/single-product/${item._id}`}
                  className="min-w-[220px] border p-3 rounded shadow hover:shadow-md bg-white flex-shrink-0"
                >
                  <img
                    src={getImageUrl(item.product_image)}
                    alt={item.product_name}
                    className="w-full h-40 object-cover rounded"
                  />
                  <h4 className="mt-2 text-sm font-semibold truncate">
                    {item.product_name}
                  </h4>
                  <div>
                    <p className="text-orange-600 font-bold text-sm">
                      ₹{item.selling_price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <button
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full"
              onClick={() => {
                document.getElementById("catCarousel").scrollLeft += 300;
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

export default SingleProduct;
