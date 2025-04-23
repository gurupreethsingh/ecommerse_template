const fs = require("fs");
const path = require("path");
const multer = require("multer");
const Product = require("../models/Product");

// === Image Upload Config ===
const uploadDir = path.join("uploads", "product_images");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, filename);
  },
});

const productUpload = multer({ storage: productStorage });

// === CRUD Operations ===

// Create Product
const createProduct = async (req, res) => {
  try {
    const {
      product_name,
      slug,
      description,
      category,
      brand,
      SKU,
      barcode,
      stock,
      warehouse_stock,
      outlet,
      dimensions,
      color,
      material,
      section_to_appear,
      featured,
      is_new_arrival,
      is_trending,
      availability_status,
      discount,
      min_purchase_qty,
      max_purchase_qty,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules,
      campaign,
      vendor,
      tags,
    } = req.body;

    const product_image = req.files?.product_image?.[0]
      ? path.join(uploadDir, req.files.product_image[0].filename).replace(/\\/g, "/")
      : "";

    const all_product_images = req.files?.all_product_images
      ? req.files.all_product_images.map((file) =>
          path.join(uploadDir, file.filename).replace(/\\/g, "/")
        )
      : [];

    const newProduct = new Product({
      product_name,
      slug,
      product_image,
      all_product_images,
      description,
      category,
      brand,
      SKU,
      barcode,
      stock,
      warehouse_stock,
      outlet,
      dimensions,
      color,
      material,
      tags,
      section_to_appear,
      featured,
      is_new_arrival,
      is_trending,
      availability_status,
      discount,
      min_purchase_qty,
      max_purchase_qty,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules,
      campaign,
      vendor,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({ error: error.message });
  }
};

// Get All Products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category vendor");
    if (!product || product.isDeleted) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product || product.isDeleted) return res.status(404).json({ error: "Product not found" });

    Object.assign(product, req.body);

    // Update image if uploaded
    if (req.files?.product_image?.[0]) {
      if (product.product_image) {
        const oldPath = path.join(__dirname, "..", product.product_image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      product.product_image = path.join(uploadDir, req.files.product_image[0].filename).replace(/\\/g, "/");
    }

    if (req.files?.all_product_images) {
      product.all_product_images = req.files.all_product_images.map((file) =>
        path.join(uploadDir, file.filename).replace(/\\/g, "/")
      );
    }

    product.updatedAt = Date.now();
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Soft Delete Product
const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Product soft-deleted successfully", product: deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// === Count Functions ===
const countAllProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments({ isDeleted: false });
    res.status(200).json({ total: count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countProductsByCategory = async (req, res) => {
  try {
    const count = await Product.countDocuments({ category: req.params.categoryId, isDeleted: false });
    res.status(200).json({ categoryId: req.params.categoryId, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countProductsByVendor = async (req, res) => {
  try {
    const count = await Product.countDocuments({ vendor: req.params.vendorId, isDeleted: false });
    res.status(200).json({ vendorId: req.params.vendorId, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countProductsBySection = async (req, res) => {
  try {
    const count = await Product.countDocuments({ section_to_appear: req.params.section, isDeleted: false });
    res.status(200).json({ section: req.params.section, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const countFeaturedProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments({ featured: true, isDeleted: false });
    res.status(200).json({ featured: true, count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  productUpload,
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  countAllProducts,
  countProductsByCategory,
  countProductsByVendor,
  countProductsBySection,
  countFeaturedProducts,
};
