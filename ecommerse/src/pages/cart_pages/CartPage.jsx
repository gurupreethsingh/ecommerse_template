
import React, { useContext } from "react";
import { CartContext } from "../../components/cart_components/CartContext";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";
import globalBackendRoute from "../../config/Config";

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(CartContext);

  const handleIncrease = (id, qty) => {
    updateQuantity(id, qty + 1);
  };

  const handleDecrease = (id, qty) => {
    if (qty > 1) {
      updateQuantity(id, qty - 1);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between p-4 border rounded-md">
              <div className="flex items-center gap-4">
                <img
                  src={`${globalBackendRoute}/uploads/products/${item.product_image}`}
                  alt={item.product_name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-bold">{item.product_name}</h2>
                  <p className="text-green-600 font-bold">₹ {item.selling_price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => handleDecrease(item._id, item.quantity)} className="p-1 bg-gray-200 rounded">
                  <FaMinus />
                </button>
                <span className="font-bold">{item.quantity}</span>
                <button onClick={() => handleIncrease(item._id, item.quantity)} className="p-1 bg-gray-200 rounded">
                  <FaPlus />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
