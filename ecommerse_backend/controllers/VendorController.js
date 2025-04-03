const Vendor = require("../models/VendorModel");
const Product = require("../models/ProductModel");

// Add a new vendor
const addVendor = async (req, res) => {
  try {
    const newVendor = new Vendor(req.body);
    const savedVendor = await newVendor.save();
    res
      .status(201)
      .json({ message: "Vendor added successfully", vendor: savedVendor });
  } catch (error) {
    console.error("Error adding vendor:", error);
    res
      .status(500)
      .json({ message: "Error adding vendor", error: error.message });
  }
};

// Delete a vendor
const deleteVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const deletedVendor = await Vendor.findByIdAndDelete(vendorId);
    if (!deletedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res
      .status(200)
      .json({ message: "Vendor deleted successfully", vendor: deletedVendor });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    res
      .status(500)
      .json({ message: "Error deleting vendor", error: error.message });
  }
};

// Update a vendor
const updateVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, req.body, {
      new: true,
    });
    if (!updatedVendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res
      .status(200)
      .json({ message: "Vendor updated successfully", vendor: updatedVendor });
  } catch (error) {
    console.error("Error updating vendor:", error);
    res
      .status(500)
      .json({ message: "Error updating vendor", error: error.message });
  }
};

// Get a specific vendor by ID
const getVendorById = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId).populate({
      path: "products.product",
      select: "product_name stock",
    });

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Filter out null or invalid products
    vendor.products = vendor.products.filter((p) => p.product !== null);

    res.status(200).json(vendor);
  } catch (error) {
    console.error("Error fetching vendor:", error);
    res
      .status(500)
      .json({ message: "Error fetching vendor", error: error.message });
  }
};

// Get all vendors
const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    console.error("Error fetching vendors:", error.message);
    res.status(500).json({ error: "Failed to fetch vendors" });
  }
};

// Add a product to a vendor
const addProductToVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const { productId, quantity } = req.body;

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const existingProduct = vendor.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity; // Update quantity if product already exists
    } else {
      vendor.products.push({ product: productId, quantity });
    }

    await vendor.save();
    res
      .status(200)
      .json({ message: "Product added to vendor successfully", vendor });
  } catch (error) {
    console.error("Error adding product to vendor:", error);
    res.status(500).json({
      message: "Error adding product to vendor",
      error: error.message,
    });
  }
};

// Fetch all products of a vendor
const getProductsOfVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId).populate("products.product");
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor.products);
  } catch (error) {
    console.error("Error fetching products of vendor:", error);
    res.status(500).json({
      message: "Error fetching products of vendor",
      error: error.message,
    });
  }
};

// Fetch count of all products in a vendor
const getProductCountInVendor = async (req, res) => {
  try {
    const { vendorId } = req.params;
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    const productCount = vendor.products.reduce(
      (count, p) => count + p.quantity,
      0
    );
    res.status(200).json({ productCount });
  } catch (error) {
    console.error("Error fetching product count in vendor:", error);
    res.status(500).json({
      message: "Error fetching product count in vendor",
      error: error.message,
    });
  }
};

// Delete a product from a vendor
const deleteProductFromVendor = async (req, res) => {
  try {
    const { vendorId, productId } = req.params;

    // Find the vendor by ID
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    // Filter out the product to be deleted
    const initialLength = vendor.products.length;
    vendor.products = vendor.products.filter(
      (p) => p.product.toString() !== productId
    );

    if (vendor.products.length === initialLength) {
      return res
        .status(404)
        .json({ message: "Product not found in vendor's product list" });
    }

    // Save the updated vendor
    await vendor.save();
    res.status(200).json({
      message: "Product deleted successfully from vendor",
      vendor,
    });
  } catch (error) {
    console.error("Error deleting product from vendor:", error);
    res.status(500).json({
      message: "Error deleting product from vendor",
      error: error.message,
    });
  }
};

// count the number fo vendors.
// Count all vendors
const countAllVendors = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();
    res.status(200).json({ totalVendors });
  } catch (error) {
    console.error("Error counting vendors:", error.message);
    res.status(500).json({
      message: "Error counting vendors",
      error: error.message,
    });
  }
};

module.exports = {
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
};
