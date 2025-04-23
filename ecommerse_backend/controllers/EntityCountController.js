// controllers/CountController.js
const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const Vendor = require("../models/VendorModel");
const Outlet = require("../models/OutletModel");
const User = require("../models/UserModel");

const getAllEntityCounts = async (req, res) => {
  try {
    const [categoryCount, productCount, vendorCount, outletCount] =
      await Promise.all([
        Category.countDocuments(),
        Product.countDocuments(),
        Vendor.countDocuments(),
        Outlet.countDocuments(),
      ]);

    res.status(200).json({
      category: categoryCount,
      product: productCount,
      vendor: vendorCount,
      outlet: outletCount,
    });
  } catch (error) {
    console.error("Error fetching entity counts", error);
    res.status(500).json({ message: "Error fetching entity counts" });
  }
};

module.exports = { getAllEntityCounts };
