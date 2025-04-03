const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema({
  vendor_name: { type: String, required: true },
  vendor_email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  vendor_phone: { type: String, required: true },
  vendor_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    country: { type: String, required: true },
  },
    // Product inventory
    products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, required: true }, // Quantity specific to this outlet
        },
      ],
  company_name: { type: String, required: true },
  company_registration_number: {
    type: String,
    unique: true,
    required: true,
  },
  bank_details: {
    bank_name: { type: String, required: true },
    account_number: { type: String, required: true },
    ifsc_code: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  created_at: { type: Date, default: Date.now },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
