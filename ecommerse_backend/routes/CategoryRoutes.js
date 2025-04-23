const express = require("express");
const router = express.Router();
const {
  categoryUpload,
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryCount,
  getCategoryProductCounts,
} = require("../controllers/CategoryController");

// -----------------------------------
// ROUTES
// -----------------------------------

// @route   POST /api/categories
// @desc    Add a new category with image
router.post(
  "/add-category",
  categoryUpload.single("category_image"),
  addCategory
);

// @route   GET /api/categories
// @desc    Get all categories
router.get("/all-categories", getAllCategories);

// @route   GET /api/categories/count
// @desc    Get total number of categories
router.get("/category-count", getCategoryCount);

// @route   GET /api/categories/product-counts
// @desc    Get product count per category
router.get("/category-product-counts", getCategoryProductCounts);

// @route   GET /api/categories/:id
// @desc    Get category by ID
// Get a category by ID
router.get("/single-category/:id", getCategoryById);

// @route   PUT /api/categories/:id
// @desc    Update category (with optional image)
router.put(
  "/update-category/:id",
  categoryUpload.single("category_image"),
  updateCategory
);

// @route   DELETE /api/categories/:id
// @desc    Delete category and its image
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
