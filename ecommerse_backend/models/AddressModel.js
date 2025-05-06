const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Optional for guest users
    },
    type: {
      type: String,
      enum: ["billing", "shipping"],
      required: true,
    },
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    isDefault: { type: Boolean, default: false },
    // Fields for guest users
    guestName: { type: String },
    guestEmail: { type: String },
    guestPhone: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
