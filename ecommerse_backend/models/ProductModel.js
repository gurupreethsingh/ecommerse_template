// ✅ Updated ProductModel.js

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  product_name: { type: String, required: true, trim: true },
  slug: { type: String, unique: true },
  product_image: { type: String, required: false },
  all_product_images: [{ type: String }],
  description: { type: String, required: true },
  sku: { type: String, required: true, unique: true, trim: true }, // ✅ ADDED
  display_price: { type: Number }, // ✅ base price
  selling_price: { type: Number, required: true }, // ✅ after discount if needed

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: false, // ✅ Made optional
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
    required: false,
  },
  brand: { type: String, required: true, trim: true },
  barcode: { type: String, trim: true },
  stock: { type: Number, required: true },
  warehouse_stock: [
    {
      warehouse_id: { type: mongoose.Schema.Types.ObjectId, ref: "Warehouse" },
      stock: Number,
    },
  ],
  total_products_sold: { type: Number, default: 0 },

  outlet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Outlet",
    required: true,
    default: "6809f7f0ed9f36edb58306b4", // dummy outlet id
  },

  dimensions: {
    length: { type: Number },
    width: { type: Number },
    height: { type: Number },
  },
  color: { type: String, trim: true },
  material: { type: String, trim: true },
  ratings: { type: Number, default: 0 },
  avg_rating: { type: Number, default: 0 },
  total_reviews: { type: Number, default: 0 },
  tags: [{ type: String }],
  section_to_appear: {
    type: [String],
    default: ["all_products"],
    enum: [
      "all_products",
      "top_deals",
      "new_arrivals",
      "featured",
      "trending",
      "most_viewed",
      "recommended",
      "home_banner",
      "limited_time_offers",
    ],
  },
  featured: { type: Boolean, default: false },
  is_new_arrival: { type: Boolean, default: false },
  is_trending: { type: Boolean, default: false },
  availability_status: { type: Boolean, default: true },
  discount: { type: Number, default: 0 },
  min_purchase_qty: { type: Number, default: 1 },
  max_purchase_qty: { type: Number, default: 100 },
  delivery_time_estimate: { type: String },
  replacement_policy: { type: String },
  origin_country: { type: String },
  pricing_rules: [
    {
      type: { type: String, enum: ["flat", "percentage"] },
      value: Number,
      start_date: Date,
      end_date: Date,
    },
  ],
  campaign: {
    name: String,
    discount: Number,
    start_date: Date,
    end_date: Date,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
    default: "6809f7f0ed9f36edb58306c5", // dummy vendor id
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  returns: [{ type: mongoose.Schema.Types.ObjectId, ref: "Return" }],
  wishlist_users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  questions: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      question: String,
      answer: String,
      answeredBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
      answeredAt: Date,
    },
  ],
  related_products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  bundles: [
    {
      items: [
        {
          product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
          quantity: Number,
        },
      ],
      bundle_price: Number,
    },
  ],
  vector_embedding: { type: [Number] },
  popularity_score: { type: Number, default: 0 },
  meta_title: { type: String },
  meta_description: { type: String },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
  isDeleted: { type: Boolean, default: false },
  version: { type: Number, default: 1 },
  admin_notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

productSchema.index({
  product_name: "text",
  tags: "text",
  meta_title: "text",
  meta_description: "text",
});
productSchema.index({ category: 1 });
productSchema.index({ vendor: 1 });

productSchema.methods.isLinkedToUser = function (userId) {
  const userInWishlist = this.wishlist_users.some(
    (user) => user.toString() === userId.toString()
  );
  const userInOrders = this.orders.some(
    (order) => order.user && order.user.toString() === userId.toString()
  );
  const userInPurchases = this.purchases.some(
    (user) => user.toString() === userId.toString()
  );
  return userInWishlist || userInOrders || userInPurchases;
};

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
