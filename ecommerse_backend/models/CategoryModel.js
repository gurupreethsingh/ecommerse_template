const mongoose = require("mongoose");

// Category Schema
const categorySchema = new mongoose.Schema({
  category_name: { type: String, required: true, unique: true },
  category_image: { type: String, required: true },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }], // Array of products linked to this category
  createdAt: { type: Date, default: Date.now }, // Timestamp for record creation
  updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
});

// Pre-save middleware to update 'updatedAt' field automatically
categorySchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
