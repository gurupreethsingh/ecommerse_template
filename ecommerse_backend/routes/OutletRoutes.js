const express = require("express");
const router = express.Router();
const {
  addOutlet,
  deleteOutlet,
  updateOutlet,
  getOutletById,
  getAllOutlets,
  addProductToOutlet,
  getProductsOfOutlet,
  getProductCountInOutlet,
  updateProductQuantity,
} = require("../controllers/OutletController");

// Route to add a new outlet
router.post("/add-outlet", addOutlet);

// Route to delete an outlet by ID
router.delete("/delete-outlet/:outletId", deleteOutlet);

// Route to update an outlet by ID
router.put("/update-outlet/:outletId", updateOutlet);

// Route to get a specific outlet by ID
router.get("/get-outlet-by-id/:outletId", getOutletById);

// Route to get all outlets
router.get("/all-outlets", getAllOutlets);

// Route to add a product to an outlet
router.post("/add-product-to-outlet/:outletId", addProductToOutlet);

// Route to fetch all products of an outlet
router.get("/get-products-of-outlet/:outletId", getProductsOfOutlet);

// Route to fetch the count of all products in an outlet
router.get("/get-product-count-in-outlet/:outletId", getProductCountInOutlet);

// Route to update product quantities based on an order
router.post("/update-product-quantity/:outletId", updateProductQuantity);

module.exports = router;
