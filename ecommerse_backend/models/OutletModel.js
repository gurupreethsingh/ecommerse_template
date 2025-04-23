const mongoose = require("mongoose");

const outletSchema = new mongoose.Schema({
  // Basic outlet details
  outlet_name: { type: String, required: true },
  location: { type: String, required: true },

  // Vendor details integrated into the outlet
  outlet_email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  outlet_phone: {
    type: String,
    required: true,
  },
  outlet_address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, required: true },
    country: { type: String, required: true },
  },
  company_name: {
    type: String,
    required: true,
  },
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

  // Associated orders
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
    },
  ],

  // Timestamps
  created_at: {
    type: Date,
    default: Date.now,
  },
});

// Static method to update product quantity based on an order
outletSchema.statics.updateProductQuantityOnOrder = async function (
  outletId,
  orderDetails
) {
  try {
    const outlet = await this.findById(outletId);

    if (!outlet) {
      throw new Error("Outlet not found");
    }

    // Loop through each product in the order
    for (const item of orderDetails.products) {
      const productInOutlet = outlet.products.find(
        (p) => p.product.toString() === item.product.toString()
      );

      if (!productInOutlet) {
        throw new Error(`Product with ID ${item.product} not found in outlet`);
      }

      if (productInOutlet.quantity < item.quantity) {
        throw new Error(`Insufficient stock for product ID ${item.product}`);
      }

      // Reduce the stock in the outlet
      productInOutlet.quantity -= item.quantity;
    }

    await outlet.save();
    return outlet;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Virtual field to get the products count for the outlet
outletSchema.virtual("productCount", {
  ref: "Product", // Reference to the Product model
  localField: "products.product",
  foreignField: "_id",
  count: true, // Returns the count of products
});

const Outlet = mongoose.model("Outlet", outletSchema);

module.exports = Outlet;
