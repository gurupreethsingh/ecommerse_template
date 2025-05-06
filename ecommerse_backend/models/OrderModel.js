const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product_name: { type: String, required: true },
  selling_price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  product_image: { type: String }, // optional
});

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null, // for guest checkout
    },
    billingAddress: {
      type: Object,
      required: true,
    },
    shippingAddress: {
      type: Object,
      required: true,
    },
    items: [orderItemSchema],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    orderStatus: {
      type: String,
      enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Processing",
    },

    // 🆕 Guest Info Fields
    guestName: { type: String }, // Optional
    guestEmail: { type: String },
    guestPhone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
