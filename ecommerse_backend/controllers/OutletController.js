const Outlet = require("../models/OutletModel");
const Product = require("../models/ProductModel");

// Add a new outlet
const addOutlet = async (req, res) => {
  try {
    const newOutlet = new Outlet(req.body);
    const savedOutlet = await newOutlet.save();
    res
      .status(201)
      .json({ message: "Outlet added successfully", outlet: savedOutlet });
  } catch (error) {
    console.error("Error adding outlet:", error);
    res
      .status(500)
      .json({ message: "Error adding outlet", error: error.message });
  }
};

// Delete an outlet
const deleteOutlet = async (req, res) => {
  try {
    const { outletId } = req.params;
    const deletedOutlet = await Outlet.findByIdAndDelete(outletId);
    if (!deletedOutlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    res
      .status(200)
      .json({ message: "Outlet deleted successfully", outlet: deletedOutlet });
  } catch (error) {
    console.error("Error deleting outlet:", error);
    res
      .status(500)
      .json({ message: "Error deleting outlet", error: error.message });
  }
};

// Update an outlet
const updateOutlet = async (req, res) => {
  try {
    const { outletId } = req.params;
    const updatedOutlet = await Outlet.findByIdAndUpdate(outletId, req.body, {
      new: true,
    });
    if (!updatedOutlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    res
      .status(200)
      .json({ message: "Outlet updated successfully", outlet: updatedOutlet });
  } catch (error) {
    console.error("Error updating outlet:", error);
    res
      .status(500)
      .json({ message: "Error updating outlet", error: error.message });
  }
};

// Get a specific outlet by ID
const getOutletById = async (req, res) => {
  try {
    const { outletId } = req.params;
    const outlet = await Outlet.findById(outletId).populate({
      path: "products.product",
      select: "product_name stock",
    });

    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    // Filter out null or invalid products
    outlet.products = outlet.products.filter((p) => p.product !== null);

    res.status(200).json(outlet);
  } catch (error) {
    console.error("Error fetching outlet:", error);
    res
      .status(500)
      .json({ message: "Error fetching outlet", error: error.message });
  }
};

const getAllOutlets = async (req, res) => {
  try {
    const outlets = await Outlet.find(); // Fetch only necessary fields
    res.status(200).json(outlets);
  } catch (error) {
    console.error("Error fetching outlets:", error.message);
    res.status(500).json({ error: "Failed to fetch outlets" });
  }
};

// Add a product to an outlet
const addProductToOutlet = async (req, res) => {
  try {
    const { outletId } = req.params;
    const { productId, quantity } = req.body;

    const outlet = await Outlet.findById(outletId);
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }

    const existingProduct = outlet.products.find(
      (p) => p.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity; // Update quantity if product already exists
    } else {
      outlet.products.push({ product: productId, quantity });
    }

    await outlet.save();
    res
      .status(200)
      .json({ message: "Product added to outlet successfully", outlet });
  } catch (error) {
    console.error("Error adding product to outlet:", error);
    res.status(500).json({
      message: "Error adding product to outlet",
      error: error.message,
    });
  }
};

// Fetch all products of an outlet
const getProductsOfOutlet = async (req, res) => {
  try {
    const { outletId } = req.params;
    const outlet = await Outlet.findById(outletId).populate("products.product");
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    res.status(200).json(outlet.products);
  } catch (error) {
    console.error("Error fetching products of outlet:", error);
    res.status(500).json({
      message: "Error fetching products of outlet",
      error: error.message,
    });
  }
};

// Fetch count of all products in an outlet
const getProductCountInOutlet = async (req, res) => {
  try {
    const { outletId } = req.params;
    const outlet = await Outlet.findById(outletId);
    if (!outlet) {
      return res.status(404).json({ message: "Outlet not found" });
    }
    const productCount = outlet.products.reduce(
      (count, p) => count + p.quantity,
      0
    );
    res.status(200).json({ productCount });
  } catch (error) {
    console.error("Error fetching product count in outlet:", error);
    res.status(500).json({
      message: "Error fetching product count in outlet",
      error: error.message,
    });
  }
};

// Update product quantity based on an order
const updateProductQuantity = async (req, res) => {
  try {
    const { outletId } = req.params;
    const orderDetails = req.body; // Assume orderDetails contains product IDs and quantities

    const outlet = await Outlet.updateProductQuantityOnOrder(
      outletId,
      orderDetails
    );
    res
      .status(200)
      .json({ message: "Product quantities updated successfully", outlet });
  } catch (error) {
    console.error("Error updating product quantities:", error);
    res.status(500).json({
      message: "Error updating product quantities",
      error: error.message,
    });
  }
};

module.exports = {
  addOutlet,
  deleteOutlet,
  updateOutlet,
  getOutletById,
  getAllOutlets,
  addProductToOutlet,
  getProductsOfOutlet,
  getProductCountInOutlet,
  updateProductQuantity,
};
