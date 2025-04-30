// // import React, { useEffect, useState, useContext } from "react";
// // import { useParams, Link } from "react-router-dom";
// // import {
// //   FaHeart,
// //   FaStar,
// //   FaCartPlus,
// //   FaRupeeSign,
// //   FaMinus,
// //   FaPlus,
// // } from "react-icons/fa";
// // import { motion } from "framer-motion";
// // import axios from "axios";
// // import globalBackendRoute from "../../config/Config";
// // import { toast } from "react-toastify";
// // import { CartContext } from "../../components/cart_components/CartContext";

// // const SingleProduct = () => {
// //   const { id } = useParams();
// //   const [product, setProduct] = useState(null);
// //   const [mainImage, setMainImage] = useState(null);
// //   const [quantity, setQuantity] = useState(1);
// //   const [zoomStyle, setZoomStyle] = useState({});
// //   const { addToCart } = useContext(CartContext);

// //   useEffect(() => {
// //     const fetchProduct = async () => {
// //       try {
// //         const res = await axios.get(
// //           `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
// //         );
// //         setProduct(res.data);
// //         setMainImage(res.data.product_image);
// //       } catch (error) {
// //         console.error("Failed to load product:", error.message);
// //       }
// //     };
// //     fetchProduct();
// //   }, [id]);

// //   const getImageUrl = (img) => {
// //     if (!img) return "https://via.placeholder.com/150";
// //     const fileName = img.replace(/\\/g, "/").split("/").pop();
// //     return `${globalBackendRoute}/uploads/products/${fileName}`;
// //   };

// //   const handleZoom = (e) => {
// //     const { offsetX, offsetY, target } = e.nativeEvent;
// //     const { offsetWidth, offsetHeight } = target;
// //     const x = (offsetX / offsetWidth) * 100;
// //     const y = (offsetY / offsetHeight) * 100;
// //     setZoomStyle({
// //       backgroundImage: `url(${getImageUrl(mainImage)})`,
// //       backgroundPosition: `${x}% ${y}%`,
// //       backgroundSize: "200%",
// //     });
// //   };

// //   const handleAddToCart = () => {
// //     if (product.availability_status) {
// //       addToCart({ ...product, quantity });
// //     } else {
// //       toast.error("Out of Stock");
// //     }
// //   };

// //   const changeQuantity = (type) => {
// //     setQuantity((prev) => {
// //       if (type === "inc") return prev + 1;
// //       return prev > 1 ? prev - 1 : 1;
// //     });
// //   };

// //   if (!product) {
// //     return (
// //       <div className="text-center text-xl text-gray-500 py-20">Loading...</div>
// //     );
// //   }

// //   return (
// //     <div className="containerWidth py-10 px-4 flex flex-col gap-10">
// //       {/* Image Gallery and Product Info */}
// //       <div className="flex flex-col lg:flex-row gap-10">
// //         <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
// //           <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
// //             {[product.product_image, ...(product.all_product_images || [])].map(
// //               (img, idx) => (
// //                 <img
// //                   key={idx}
// //                   src={getImageUrl(img)}
// //                   alt="thumbnail"
// //                   className="w-16 h-16 rounded-lg border cursor-pointer object-cover hover:scale-105 transition"
// //                   onClick={() => setMainImage(img)}
// //                 />
// //               )
// //             )}
// //           </div>

// //           <div className="relative border rounded-lg overflow-hidden w-full bg-white shadow-lg">
// //             <div
// //               onMouseMove={handleZoom}
// //               onMouseLeave={() => setZoomStyle({})}
// //               className="w-full h-[400px] bg-no-repeat bg-center bg-cover transition-all"
// //               style={
// //                 Object.keys(zoomStyle).length > 0
// //                   ? zoomStyle
// //                   : {
// //                       backgroundImage: `url(${getImageUrl(mainImage)})`,
// //                       backgroundSize: "contain",
// //                     }
// //               }
// //             />
// //           </div>
// //         </div>

// //         <div className="w-full lg:w-1/2 space-y-5">
// //           <h1 className="text-3xl font-bold text-gray-800">
// //             {product.product_name}
// //           </h1>

// //           <div className="flex items-center gap-1 text-orange-500">
// //             {[...Array(5)].map((_, idx) => (
// //               <FaStar
// //                 key={idx}
// //                 className={`$ {
// //                   idx < Math.round(product.avg_rating)
// //                     ? "text-orange-500"
// //                     : "text-gray-300"
// //                 } w-5 h-5`}
// //               />
// //             ))}
// //             <span className="ml-2 text-sm text-gray-600">
// //               ({product.total_reviews} reviews)
// //             </span>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <h2 className="text-3xl font-bold text-green-600 flex items-center">
// //               <FaRupeeSign /> {product.selling_price}
// //             </h2>
// //             {product.display_price && (
// //               <span className="text-lg line-through text-gray-400 flex items-center">
// //                 <FaRupeeSign /> {product.display_price}
// //               </span>
// //             )}
// //           </div>

// //           <div className="flex items-center gap-3 mt-4">
// //             <span className="text-sm text-gray-600">Qty:</span>
// //             <button
// //               onClick={() => changeQuantity("dec")}
// //               className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
// //             >
// //               <FaMinus />
// //             </button>
// //             <span className="text-lg font-bold">{quantity}</span>
// //             <button
// //               onClick={() => changeQuantity("inc")}
// //               className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
// //             >
// //               <FaPlus />
// //             </button>
// //           </div>

// //           <p className="text-gray-700 leading-relaxed">{product.description}</p>

// //           <div className="flex flex-col sm:flex-row gap-4 mt-6">
// //             <button
// //               onClick={handleAddToCart}
// //               className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90"
// //             >
// //               <FaCartPlus /> Add to Cart
// //             </button>
// //             <button className="border border-orange-500 text-orange-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2">
// //               <FaHeart /> Wishlist
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Technical and Delivery Details */}
// //       <div className="grid md:grid-cols-2 gap-6 mt-12 bg-white p-6 rounded-lg shadow">
// //         <div>
// //           <h2 className="font-bold text-lg mb-3">Technical Details</h2>
// //           <ul className="text-gray-700 space-y-1">
// //             <li>
// //               <strong>SKU:</strong> {product.sku}
// //             </li>
// //             <li>
// //               <strong>Brand:</strong> {product.brand}
// //             </li>
// //             <li>
// //               <strong>Color:</strong> {product.color}
// //             </li>
// //             <li>
// //               <strong>Material:</strong> {product.material}
// //             </li>
// //             <li>
// //               <strong>Barcode:</strong> {product.barcode}
// //             </li>
// //             <li>
// //               <strong>Dimensions:</strong> {product.dimensions?.length} x{" "}
// //               {product.dimensions?.width} x {product.dimensions?.height} cm
// //             </li>
// //             <li>
// //               <strong>Stock Available:</strong> {product.stock}
// //             </li>
// //           </ul>
// //         </div>
// //         <div>
// //           <h2 className="font-bold text-lg mb-3">Delivery & Returns</h2>
// //           <ul className="text-gray-700 space-y-1">
// //             <li>
// //               <strong>Delivery Estimate:</strong>{" "}
// //               {product.delivery_time_estimate}
// //             </li>
// //             <li>
// //               <strong>Replacement Policy:</strong> {product.replacement_policy}
// //             </li>
// //             <li>
// //               <strong>Country of Origin:</strong> {product.origin_country}
// //             </li>
// //           </ul>
// //         </div>
// //       </div>

// //       {/* Related Products */}
// //       {product.related_products?.length > 0 && (
// //         <div className="mt-12">
// //           <h2 className="text-2xl font-bold mb-4">Related Products</h2>
// //           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
// //             {product.related_products.map((rel) => (
// //               <Link
// //                 to={`/product/${rel._id}`}
// //                 key={rel._id}
// //                 className="border p-4 rounded-lg hover:shadow"
// //               >
// //                 <img
// //                   src={getImageUrl(rel.product_image)}
// //                   alt={rel.product_name}
// //                   className="w-full h-40 object-cover rounded mb-2"
// //                 />
// //                 <h4 className="text-sm font-bold text-gray-800">
// //                   {rel.product_name}
// //                 </h4>
// //                 <p className="text-green-600 font-semibold">
// //                   ₹{rel.selling_price}
// //                 </p>
// //               </Link>
// //             ))}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default SingleProduct;

// //

// import React, { useEffect, useState, useContext } from "react";
// import { useParams, Link } from "react-router-dom";
// import {
//   FaHeart,
//   FaStar,
//   FaCartPlus,
//   FaRupeeSign,
//   FaMinus,
//   FaPlus,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import axios from "axios";
// import globalBackendRoute from "../../config/Config";
// import { toast } from "react-toastify";
// import { CartContext } from "../../components/cart_components/CartContext";

// const SingleProduct = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [mainImage, setMainImage] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [zoomStyle, setZoomStyle] = useState({});
//   const { addToCart } = useContext(CartContext);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const res = await axios.get(
//           `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
//         );
//         setProduct(res.data);
//         setMainImage(res.data.product_image);
//       } catch (error) {
//         console.error("Failed to load product:", error.message);
//       }
//     };
//     fetchProduct();
//   }, [id]);

//   const getImageUrl = (img) => {
//     if (!img) return "https://via.placeholder.com/150";
//     const fileName = img.replace(/\\/g, "/").split("/").pop();
//     return `${globalBackendRoute}/uploads/products/${fileName}`;
//   };

//   const handleZoom = (e) => {
//     const { offsetX, offsetY, target } = e.nativeEvent;
//     const { offsetWidth, offsetHeight } = target;
//     const x = (offsetX / offsetWidth) * 100;
//     const y = (offsetY / offsetHeight) * 100;
//     setZoomStyle({
//       backgroundImage: `url(${getImageUrl(mainImage)})`,
//       backgroundPosition: `${x}% ${y}%`,
//       backgroundSize: "200%",
//     });
//   };

//   const handleAddToCart = () => {
//     if (product.availability_status) {
//       addToCart({ ...product, quantity });
//     } else {
//       toast.error("Out of Stock");
//     }
//   };

//   const changeQuantity = (type) => {
//     setQuantity((prev) => {
//       if (type === "inc") return prev + 1;
//       return prev > 1 ? prev - 1 : 1;
//     });
//   };

//   if (!product) {
//     return (
//       <div className="text-center text-xl text-gray-500 py-20">Loading...</div>
//     );
//   }

//   return (
//     <div className="containerWidth py-10 px-4 flex flex-col gap-10">
//       <div className="flex flex-col lg:flex-row gap-10">
//         <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
//           <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
//             {[product.product_image, ...(product.all_product_images || [])].map(
//               (img, idx) => (
//                 <img
//                   key={idx}
//                   src={getImageUrl(img)}
//                   alt="thumbnail"
//                   className="w-16 h-16 rounded-lg border cursor-pointer object-cover hover:scale-105 transition"
//                   onClick={() => setMainImage(img)}
//                 />
//               )
//             )}
//           </div>

//           <div className="relative border rounded-lg overflow-hidden w-full bg-white shadow-lg">
//             <div
//               onMouseMove={handleZoom}
//               onMouseLeave={() => setZoomStyle({})}
//               className="w-full h-[400px] bg-no-repeat bg-center bg-cover transition-all"
//               style={
//                 Object.keys(zoomStyle).length > 0
//                   ? zoomStyle
//                   : {
//                       backgroundImage: `url(${getImageUrl(mainImage)})`,
//                       backgroundSize: "contain",
//                     }
//               }
//             />
//           </div>
//         </div>

//         <div className="w-full lg:w-1/2 space-y-5">
//           <h1 className="text-3xl font-bold text-gray-800">
//             {product.product_name}
//           </h1>

//           <div className="flex items-center gap-1 text-orange-500">
//             {[...Array(5)].map((_, idx) => (
//               <FaStar
//                 key={idx}
//                 className={`$ {
//                   idx < Math.round(product.avg_rating)
//                     ? "text-orange-500"
//                     : "text-gray-300"
//                 } w-5 h-5`}
//               />
//             ))}
//             <span className="ml-2 text-sm text-gray-600">
//               ({product.total_reviews} reviews)
//             </span>
//           </div>

//           <div className="flex items-center gap-4">
//             <h2 className="text-3xl font-bold text-green-600 flex items-center">
//               <FaRupeeSign /> {product.selling_price}
//             </h2>
//             {product.display_price && (
//               <span className="text-lg line-through text-gray-400 flex items-center">
//                 <FaRupeeSign /> {product.display_price}
//               </span>
//             )}
//           </div>

//           <div className="flex items-center gap-3 mt-4">
//             <span className="text-sm text-gray-600">Qty:</span>
//             <button
//               onClick={() => changeQuantity("dec")}
//               className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//             >
//               <FaMinus />
//             </button>
//             <span className="text-lg font-bold">{quantity}</span>
//             <button
//               onClick={() => changeQuantity("inc")}
//               className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
//             >
//               <FaPlus />
//             </button>
//           </div>

//           <p className="text-gray-700 leading-relaxed">{product.description}</p>

//           <div className="flex flex-col sm:flex-row gap-4 mt-6">
//             <button
//               onClick={handleAddToCart}
//               className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90"
//             >
//               <FaCartPlus /> Add to Cart
//             </button>
//             <button className="border border-orange-500 text-orange-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2">
//               <FaHeart /> Wishlist
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6 mt-12 bg-white p-6 rounded-lg shadow">
//         <div>
//           <h2 className="font-bold text-lg mb-3">Technical Details</h2>
//           <ul className="text-gray-700 space-y-1">
//             <li>
//               <strong>SKU:</strong> {product.sku}
//             </li>
//             <li>
//               <strong>Brand:</strong> {product.brand}
//             </li>
//             <li>
//               <strong>Color:</strong> {product.color}
//             </li>
//             <li>
//               <strong>Material:</strong> {product.material}
//             </li>
//             <li>
//               <strong>Barcode:</strong> {product.barcode}
//             </li>
//             <li>
//               <strong>Dimensions:</strong> {product.dimensions?.length} x{" "}
//               {product.dimensions?.width} x {product.dimensions?.height} cm
//             </li>
//             <li>
//               <strong>Stock Available:</strong> {product.stock}
//             </li>
//           </ul>
//         </div>
//         <div>
//           <h2 className="font-bold text-lg mb-3">Delivery & Returns</h2>
//           <ul className="text-gray-700 space-y-1">
//             <li>
//               <strong>Delivery Estimate:</strong>{" "}
//               {product.delivery_time_estimate}
//             </li>
//             <li>
//               <strong>Replacement Policy:</strong> {product.replacement_policy}
//             </li>
//             <li>
//               <strong>Country of Origin:</strong> {product.origin_country}
//             </li>
//           </ul>
//         </div>
//       </div>

//       {product.related_products?.length > 0 && (
//         <div className="mt-12">
//           <h2 className="text-2xl font-bold mb-4">Related Products</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {product.related_products.map((rel) => (
//               <Link
//                 to={`/product/${rel._id}`}
//                 key={rel._id}
//                 className="border p-4 rounded-lg hover:shadow"
//               >
//                 <img
//                   src={getImageUrl(rel.product_image)}
//                   alt={rel.product_name}
//                   className="w-full h-40 object-cover rounded mb-2"
//                 />
//                 <h4 className="text-sm font-bold text-gray-800">
//                   {rel.product_name}
//                 </h4>
//                 <p className="text-green-600 font-semibold">
//                   ₹{rel.selling_price}
//                 </p>
//               </Link>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SingleProduct;

import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaHeart,
  FaStar,
  FaCartPlus,
  FaRupeeSign,
  FaMinus,
  FaPlus,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import globalBackendRoute from "../../config/Config";
import { toast } from "react-toastify";
import { CartContext } from "../../components/cart_components/CartContext";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${globalBackendRoute}/api/get-single-added-product-by-id/${id}`
        );
        setProduct(res.data);
        setMainImage(res.data.product_image);
      } catch (error) {
        console.error("Failed to load product:", error.message);
      }
    };
    fetchProduct();
  }, [id]);

  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/150";
    const fileName = img.replace(/\\/g, "/").split("/").pop();
    return `${globalBackendRoute}/uploads/products/${fileName}`;
  };

  const handleZoom = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;
    const x = (offsetX / offsetWidth) * 100;
    const y = (offsetY / offsetHeight) * 100;
    setZoomStyle({
      backgroundImage: `url(${getImageUrl(mainImage)})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  const handleAddToCart = () => {
    if (product.availability_status) {
      addToCart({ ...product, quantity });
    } else {
      toast.error("Out of Stock");
    }
  };

  const changeQuantity = (type) => {
    setQuantity((prev) => {
      if (type === "inc") return prev + 1;
      return prev > 1 ? prev - 1 : 1;
    });
  };

  if (!product) {
    return (
      <div className="text-center text-xl text-gray-500 py-20">Loading...</div>
    );
  }

  return (
    <div className="containerWidth py-10 px-4 flex flex-col gap-10">
      <div className="flex flex-col lg:flex-row gap-10">
        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-1/2">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto">
            {[product.product_image, ...(product.all_product_images || [])].map(
              (img, idx) => (
                <img
                  key={idx}
                  src={getImageUrl(img)}
                  alt="thumbnail"
                  className="w-16 h-16 rounded-lg border cursor-pointer object-cover hover:scale-105 transition"
                  onClick={() => setMainImage(img)}
                />
              )
            )}
          </div>

          <div className="relative border rounded-lg overflow-hidden w-full bg-white shadow-lg">
            <div
              onMouseMove={handleZoom}
              onMouseLeave={() => setZoomStyle({})}
              className="w-full h-[400px] bg-no-repeat bg-center bg-cover transition-all"
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

        <div className="w-full lg:w-1/2 space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">
            {product.product_name}
          </h1>

          <div className="flex items-center gap-1 text-orange-500">
            {[...Array(5)].map((_, idx) => (
              <FaStar
                key={idx}
                className={`$ {
                  idx < Math.round(product.avg_rating)
                    ? "text-orange-500"
                    : "text-gray-300"
                } w-5 h-5`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              ({product.total_reviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-3xl font-bold text-green-600 flex items-center">
              <FaRupeeSign /> {product.selling_price}
            </h2>
            {product.display_price && (
              <span className="text-lg line-through text-gray-400 flex items-center">
                <FaRupeeSign /> {product.display_price}
              </span>
            )}
          </div>

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

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90"
            >
              <FaCartPlus /> Add to Cart
            </button>
            <button className="border border-orange-500 text-orange-600 py-3 px-6 rounded-full font-bold text-lg hover:bg-orange-50 flex items-center justify-center gap-2">
              <FaHeart /> Wishlist
            </button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12 bg-white p-6 rounded-lg shadow">
        <div>
          <h2 className="font-bold text-lg mb-3">Technical Details</h2>
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>SKU:</strong> {product.sku}
            </li>
            <li>
              <strong>Brand:</strong> {product.brand}
            </li>
            <li>
              <strong>Color:</strong> {product.color}
            </li>
            <li>
              <strong>Material:</strong> {product.material}
            </li>
            <li>
              <strong>Barcode:</strong> {product.barcode}
            </li>
            <li>
              <strong>Dimensions:</strong> {product.dimensions?.length} x{" "}
              {product.dimensions?.width} x {product.dimensions?.height} cm
            </li>
            <li>
              <strong>Stock Available:</strong> {product.stock}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="font-bold text-lg mb-3">Delivery & Returns</h2>
          <ul className="text-gray-700 space-y-1">
            <li>
              <strong>Delivery Estimate:</strong>{" "}
              {product.delivery_time_estimate}
            </li>
            <li>
              <strong>Replacement Policy:</strong> {product.replacement_policy}
            </li>
            <li>
              <strong>Country of Origin:</strong> {product.origin_country}
            </li>
          </ul>
        </div>
      </div>

      {product.related_products?.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {product.related_products.map((rel) => (
              <Link
                to={`/product/${rel._id}`}
                key={rel._id}
                className="border p-4 rounded-lg hover:shadow"
              >
                <img
                  src={getImageUrl(rel.product_image)}
                  alt={rel.product_name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h4 className="text-sm font-bold text-gray-800">
                  {rel.product_name}
                </h4>
                <p className="text-green-600 font-semibold">
                  ₹{rel.selling_price}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
