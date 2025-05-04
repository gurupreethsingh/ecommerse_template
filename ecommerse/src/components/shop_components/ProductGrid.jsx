// // ProductGrid.jsx
// import { FaHeart, FaRupeeSign } from "react-icons/fa";
// import { MdOutlineLocalOffer } from "react-icons/md";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import globalBackendRoute from "../../config/Config";
// import { GetBadges } from "../common_components/getBadges";

// const ProductGrid = ({
//   products,
//   handleAddToCart,
//   handleToggleWishlist,
//   wishlist,
// }) => {
//   const navigate = useNavigate();

//   const getImageUrl = (img) => {
//     if (img) {
//       const normalized = img.replace(/\\/g, "/").split("/").pop();
//       return `${globalBackendRoute}/uploads/products/${normalized}`;
//     }
//     return "https://via.placeholder.com/150";
//   };

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <motion.div
//           key={product._id}
//           whileHover={{ scale: 1.03 }}
//           className="relative bg-white rounded-xl hover:shadow-lg overflow-hidden transition border border-gray-100"
//         >
//           {!product.availability_status && (
//             <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
//               Out of Stock
//             </div>
//           )}

//           <motion.button
//             whileTap={{ scale: 1.3 }}
//             onClick={(e) => {
//               e.stopPropagation();
//               handleToggleWishlist(product);
//             }}
//             className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100"
//           >
//             <FaHeart
//               className={`w-5 h-5 ${
//                 (wishlist || []).includes(product._id)
//                   ? "text-red-500"
//                   : "text-gray-400"
//               } transition-colors duration-300`}
//             />
//           </motion.button>

//           <div
//             className="w-full h-48 bg-gray-100 flex justify-center items-center cursor-pointer"
//             onClick={() => navigate(`/single-product/${product._id}`)}
//           >
//             <img
//               src={getImageUrl(product.product_image)}
//               alt={product.product_name}
//               onError={(e) => {
//                 e.target.src = "https://via.placeholder.com/150";
//               }}
//               className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
//             />
//           </div>

//           <div
//             onClick={() => navigate(`/single-product/${product._id}`)}
//             className="p-4 space-y-2 cursor-pointer"
//           >
//             {product.section_to_appear?.includes("limited_time_offers") && (
//               <div className="flex items-center gap-1 text-xs font-bold text-orange-600">
//                 <MdOutlineLocalOffer />
//                 Limited Time Deal
//               </div>
//             )}
//             <h3 className="text-md font-bold truncate text-gray-800 text-center">
//               {product.product_name}
//             </h3>

//             <div className="flex justify-center items-center gap-2 mt-1">
//               <span className="text-lg font-bold text-green-600 flex items-center">
//                 <FaRupeeSign /> {product.selling_price}
//               </span>
//               {product.display_price && (
//                 <span className="text-red-400 line-through text-sm flex items-center">
//                   <FaRupeeSign /> {product.display_price}
//                 </span>
//               )}
//             </div>

//             <div className="pt-3">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleAddToCart(product);
//                 }}
//                 disabled={!product.availability_status}
//                 className={`w-full py-2 rounded-full font-bold text-sm ${
//                   product.availability_status
//                     ? "bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90"
//                     : "bg-gray-300 text-gray-500 cursor-not-allowed"
//                 } transition`}
//               >
//                 {product.availability_status ? "Add to Cart" : "Out of Stock"}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       ))}
//     </div>
//   );
// };

// export default ProductGrid;

//

// ProductGrid.jsx
import { FaHeart, FaRupeeSign } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import globalBackendRoute from "../../config/Config";
import { GetBadges } from "../common_components/getBadges"; // ✅ FIXED IMPORT

const ProductGrid = ({
  products,
  handleAddToCart,
  handleToggleWishlist,
  wishlist,
}) => {
  const navigate = useNavigate();

  const getImageUrl = (img) => {
    if (img) {
      const normalized = img.replace(/\\/g, "/").split("/").pop();
      return `${globalBackendRoute}/uploads/products/${normalized}`;
    }
    return "https://via.placeholder.com/150";
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product._id}
          whileHover={{ scale: 1.03 }}
          className="relative bg-white rounded-xl hover:shadow-lg overflow-hidden transition border border-gray-100"
        >
          {/* 🔖 Badges Block */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {GetBadges(product).map((badge, i) => (
              <span
                key={i}
                className={`text-xs text-white font-bold px-2 py-0.5 rounded-full ${badge.color} shadow`}
              >
                {badge.label}
              </span>
            ))}
          </div>

          {/* ❌ Out of Stock Badge */}
          {!product.availability_status && (
            <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              Out of Stock
            </div>
          )}

          {/* ❤️ Wishlist */}
          <motion.button
            whileTap={{ scale: 1.3 }}
            onClick={(e) => {
              e.stopPropagation();
              handleToggleWishlist(product);
            }}
            className="absolute top-2 right-2 bg-white p-2 rounded-full shadow hover:bg-red-100"
          >
            <FaHeart
              className={`w-5 h-5 ${
                (wishlist || []).includes(product._id)
                  ? "text-red-500"
                  : "text-gray-400"
              } transition-colors duration-300`}
            />
          </motion.button>

          {/* 🖼️ Product Image */}
          <div
            className="w-full h-48 bg-gray-100 flex justify-center items-center cursor-pointer"
            onClick={() => navigate(`/single-product/${product._id}`)}
          >
            <img
              src={getImageUrl(product.product_image)}
              alt={product.product_name}
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* 📄 Product Details */}
          <div
            onClick={() => navigate(`/single-product/${product._id}`)}
            className="p-4 space-y-2 cursor-pointer"
          >
            {product.section_to_appear?.includes("limited_time_offers") && (
              <div className="flex items-center gap-1 text-xs font-bold text-orange-600">
                <MdOutlineLocalOffer />
                Limited Time Deal
              </div>
            )}
            <h3 className="text-md font-bold truncate text-gray-800 text-center">
              {product.product_name}
            </h3>

            <div className="flex justify-center items-center gap-2 mt-1">
              <span className="text-lg font-bold text-green-600 flex items-center">
                <FaRupeeSign /> {product.selling_price}
              </span>
              {product.display_price && (
                <span className="text-red-400 line-through text-sm flex items-center">
                  <FaRupeeSign /> {product.display_price}
                </span>
              )}
            </div>

            {/* 🛒 Add to Cart */}
            <div className="pt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={!product.availability_status}
                className={`w-full py-2 rounded-full font-bold text-sm ${
                  product.availability_status
                    ? "bg-gradient-to-r from-red-500 to-orange-400 text-white hover:opacity-90"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                } transition`}
              >
                {product.availability_status ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;
