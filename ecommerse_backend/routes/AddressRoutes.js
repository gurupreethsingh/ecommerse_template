// routes/AddressRoutes.js
const express = require("express");
const router = express.Router();
const addressController = require("../controllers/AddressController");
const { verifyToken } = require("../middleware/AuthMiddleware");

router.get("/get-addresses", verifyToken, addressController.getAddresses);
router.post("/add-guest-address", addressController.addGuestAddress);
router.post("/add-address", verifyToken, addressController.addAddress);
router.put(
  "/update-addreess/:id",
  verifyToken,
  addressController.updateAddress
);
router.delete(
  "/delete-address/:id",
  verifyToken,
  addressController.deleteAddress
);

module.exports = router;
