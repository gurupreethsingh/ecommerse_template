const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/ProductController");

// Multer upload configuration
const { productUpload } = ProductController;

// ========== CREATE ==========
router.post(
  "/add-product",
  productUpload.fields([
    { name: "product_image", maxCount: 1 },
    { name: "all_product_images", maxCount: 10 },
  ]),
  ProductController.createProduct
);

// ========== READ ==========
router.get("/all-added-products", ProductController.getAllProducts);
router.get(
  "/get-single-added-product-by-id/:id",
  ProductController.getProductById
);
router.get(
  "/get-products-by-category/:categoryId",
  ProductController.getProductsByCategory
);
router.get(
  "/get-products-by-subcategory/:subCategoryId",
  ProductController.getProductsBySubCategory
);
router.get("/get-products-sorted", ProductController.getProductsSorted);

// ========== UPDATE ==========
router.put(
  "/update-product/:id",
  productUpload.fields([
    { name: "product_image", maxCount: 1 },
    { name: "all_product_images", maxCount: 10 },
  ]),
  ProductController.updateProductById
);

// ========== DELETE ==========
router.delete("/delete-product/:id", ProductController.deleteProductById);

// ========== COUNTS ==========
router.get("/count-all-products", ProductController.countAllProducts);
router.get(
  "/count-products-by-category",
  ProductController.countProductsByCategory
);
router.get(
  "/count-products-by-subcategory",
  ProductController.countProductsBySubCategory
);
router.get(
  "/count-products-by-vendor",
  ProductController.countProductsByVendor
);
router.get(
  "/count-products-by-status",
  ProductController.countProductsByStatus
);
router.get(
  "/count-products-by-section",
  ProductController.countProductsBySection
);

// === New Search Route ===
router.get("/search-products", ProductController.searchProducts);

module.exports = router;
