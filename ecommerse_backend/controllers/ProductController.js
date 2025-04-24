const Product = require("../models/ProductModel");

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const productUploadDir = path.join("uploads", "products");

if (!fs.existsSync(productUploadDir)) {
  fs.mkdirSync(productUploadDir, { recursive: true });
}

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, productUploadDir);
  },
  filename: (req, file, cb) => {
    const filename = `${file.fieldname}-${Date.now()}${path.extname(
      file.originalname
    )}`;
    cb(null, filename);
  },
});

const productUpload = multer({ storage: productStorage });
exports.productUpload = productUpload;

exports.createProduct = async (req, res) => {
  try {
    // Validation: vendor and outlet must be present
    if (!req.body.vendor || !req.body.outlet) {
      return res
        .status(400)
        .json({ message: "Vendor and Outlet are required." });
    }

    // Remove empty optional fields
    if (req.body.subcategory === "") delete req.body.subcategory;
    if (req.body.category === "") delete req.body.category;

    const {
      product_name,
      slug,
      description,
      sku,
      category,
      subcategory,
      brand,
      barcode,
      stock,
      warehouse_stock,
      total_products_sold,
      outlet,
      dimensions,
      color,
      material,
      ratings,
      avg_rating,
      total_reviews,
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
      reviews,
      orders,
      purchases,
      returns,
      wishlist_users,
      questions,
      related_products,
      bundles,
      vector_embedding,
      popularity_score,
      meta_title,
      meta_description,
      createdBy,
      updatedBy,
      version,
      admin_notes,
    } = req.body;

    const mainImage =
      req.files["product_image"]?.[0]?.path.replace(/\\/g, "/") || "";
    const galleryImages =
      req.files["all_product_images"]?.map((f) => f.path.replace(/\\/g, "/")) ||
      [];

    const newProduct = new Product({
      product_name,
      slug,
      description,
      sku,
      product_image: mainImage,
      all_product_images: galleryImages,
      category,
      subcategory,
      brand,
      barcode,
      stock,
      warehouse_stock,
      total_products_sold,
      outlet,
      dimensions,
      color,
      material,
      ratings,
      avg_rating,
      total_reviews,
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
      reviews,
      orders,
      purchases,
      returns,
      wishlist_users,
      questions,
      related_products,
      bundles,
      vector_embedding,
      popularity_score,
      meta_title,
      meta_description,
      createdBy,
      updatedBy,
      version,
      admin_notes,
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Create Product Error:", error);
    if (error.code === 11000 && error.keyPattern?.sku) {
      return res
        .status(400)
        .json({ message: "SKU already exists. Please use a unique SKU." });
    }
    res.status(500).json({ message: "Failed to create product." });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false })
      .populate("category")
      .populate("subcategory")
      .populate("vendor");
    res.status(200).json(products);
  } catch (error) {
    console.error("Get All Products Error:", error);
    res.status(500).json({ message: "Failed to fetch products." });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subcategory")
      .populate("vendor");
    if (!product || product.isDeleted) {
      return res.status(404).json({ message: "Product not found." });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ message: "Failed to fetch product." });
  }
};

exports.updateProductById = async (req, res) => {
  try {
    const {
      product_name,
      slug,
      product_image,
      all_product_images,
      description,
      category,
      subcategory,
      brand,
      barcode,
      stock,
      warehouse_stock,
      total_products_sold,
      outlet,
      dimensions,
      color,
      material,
      ratings,
      avg_rating,
      total_reviews,
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
      reviews,
      orders,
      purchases,
      returns,
      wishlist_users,
      questions,
      related_products,
      bundles,
      vector_embedding,
      popularity_score,
      meta_title,
      meta_description,
      updatedBy,
      version,
      admin_notes,
    } = req.body;

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        product_name,
        slug,
        product_image,
        all_product_images,
        description,
        category,
        subcategory,
        brand,
        barcode,
        stock,
        warehouse_stock,
        total_products_sold,
        outlet,
        dimensions,
        color,
        material,
        ratings,
        avg_rating,
        total_reviews,
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
        reviews,
        orders,
        purchases,
        returns,
        wishlist_users,
        questions,
        related_products,
        bundles,
        vector_embedding,
        popularity_score,
        meta_title,
        meta_description,
        updatedBy,
        version,
        admin_notes,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json(updated);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Failed to update product." });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, updatedAt: Date.now() },
      { new: true }
    );
    if (!deleted)
      return res.status(404).json({ message: "Product not found." });
    res.status(200).json({ message: "Product deleted." });
  } catch (error) {
    console.error("Delete Product Error:", error);
    res.status(500).json({ message: "Failed to delete product." });
  }
};

exports.countAllProducts = async (req, res) => {
  try {
    const count = await Product.countDocuments({ isDeleted: false });
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: "Count failed" });
  }
};

exports.countProductsByCategory = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Count by category failed" });
  }
};

exports.countProductsBySubCategory = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$subcategory", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Count by subcategory failed" });
  }
};

exports.countProductsByVendor = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: "$vendor", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Count by vendor failed" });
  }
};

exports.countProductsByStatus = async (req, res) => {
  try {
    const available = await Product.countDocuments({
      availability_status: true,
      isDeleted: false,
    });
    const unavailable = await Product.countDocuments({
      availability_status: false,
      isDeleted: false,
    });
    res.status(200).json({ available, unavailable });
  } catch (err) {
    res.status(500).json({ message: "Count by status failed" });
  }
};

exports.countProductsBySection = async (req, res) => {
  try {
    const data = await Product.aggregate([
      { $match: { isDeleted: false } },
      { $unwind: "$section_to_appear" },
      { $group: { _id: "$section_to_appear", count: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Section count failed" });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({
      category: req.params.categoryId,
      isDeleted: false,
    })
      .populate("subcategory")
      .populate("vendor");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch by category." });
  }
};

exports.getProductsBySubCategory = async (req, res) => {
  try {
    const products = await Product.find({
      subcategory: req.params.subCategoryId,
      isDeleted: false,
    })
      .populate("category")
      .populate("vendor");
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch by subcategory." });
  }
};

exports.getProductsSorted = async (req, res) => {
  try {
    const { field = "createdAt", order = "desc" } = req.query;
    const sortOrder = order === "asc" ? 1 : -1;
    const products = await Product.find({ isDeleted: false }).sort({
      [field]: sortOrder,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to sort products." });
  }
};
