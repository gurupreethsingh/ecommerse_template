const express = require("express");
const router = express.Router();
const {
  addVendor,
  deleteVendor,
  updateVendor,
  getVendorById,
  getAllVendors,
  addProductToVendor,
  getProductsOfVendor,
  getProductCountInVendor,
  deleteProductFromVendor,
  countAllVendors,
} = require("../controllers/VendorController");

// Routes for Vendor Management
router.post("/add-vendor", addVendor); // Add a new vendor
router.delete("/delete-vendor/:vendorId", deleteVendor); // Delete a vendor
router.put("/updatae-vendor/:vendorId", updateVendor); // Update a vendor
router.get("/get-vendor-by-id/:vendorId", getVendorById); // Get vendor by ID
router.get("/all-vendors", getAllVendors); // Get all vendors

// Routes for Vendor Products
router.post("/vendor/:vendorId/all-product", addProductToVendor); // Add a product to vendor
router.get("/vendors/:vendorId/get-all-products", getProductsOfVendor); // Fetch all products of a vendor
router.get("/vendors/:vendorId/all-products/count", getProductCountInVendor); // Fetch product count in vendor
router.delete("/vendors/:vendorId/delete-product", deleteProductFromVendor); // Delete a product from vendor
router.get("/vendors/count", countAllVendors);

module.exports = router;
