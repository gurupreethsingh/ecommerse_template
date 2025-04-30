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
      selling_price,
      display_price,
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
      selling_price,
      display_price,
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
      .populate("vendor")
      .populate({
        path: "related_products",
        select: "product_name product_image selling_price",
      })
      .populate({
        path: "bundles.items.product",
        select: "product_name product_image selling_price",
      });

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
      description,
      selling_price,
      display_price,
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

    const cleanArray = (arr) => {
      if (typeof arr === "string") {
        try {
          const parsed = JSON.parse(arr);
          if (Array.isArray(parsed)) return parsed;
          return [];
        } catch {
          return [];
        }
      }
      if (!Array.isArray(arr)) return [];
      return arr;
    };

    // 🛡️ Fix pricing_rules
    let safePricingRules = [];
    if (pricing_rules) {
      if (typeof pricing_rules === "string") {
        try {
          const parsed = JSON.parse(pricing_rules);
          if (Array.isArray(parsed)) {
            safePricingRules = parsed;
          }
        } catch (err) {
          console.error("Invalid pricing_rules format:", err);
          safePricingRules = [];
        }
      } else if (Array.isArray(pricing_rules)) {
        safePricingRules = pricing_rules;
      }
    }

    const updatedFields = {
      product_name,
      slug,
      description,
      selling_price: selling_price ? Number(selling_price) : 0,
      display_price: display_price ? Number(display_price) : 0,
      category,
      subcategory,
      brand,
      barcode,
      stock: stock ? Number(stock) : 0,
      warehouse_stock: cleanArray(warehouse_stock),
      total_products_sold: total_products_sold
        ? Number(total_products_sold)
        : 0,
      outlet,
      dimensions,
      color,
      material,
      ratings: ratings ? Number(ratings) : 0,
      avg_rating: avg_rating ? Number(avg_rating) : 0,
      total_reviews: total_reviews ? Number(total_reviews) : 0,
      tags: cleanArray(tags),
      section_to_appear: cleanArray(section_to_appear),
      featured: featured === "true" || featured === true,
      is_new_arrival: is_new_arrival === "true" || is_new_arrival === true,
      is_trending: is_trending === "true" || is_trending === true,
      availability_status:
        availability_status === "true" || availability_status === true,
      discount: discount ? Number(discount) : 0,
      min_purchase_qty: min_purchase_qty ? Number(min_purchase_qty) : 1,
      max_purchase_qty: max_purchase_qty ? Number(max_purchase_qty) : 100,
      delivery_time_estimate,
      replacement_policy,
      origin_country,
      pricing_rules: safePricingRules,
      campaign,
      vendor,
      reviews: cleanArray(reviews),
      orders: cleanArray(orders),
      purchases: cleanArray(purchases),
      returns: cleanArray(returns),
      wishlist_users: cleanArray(wishlist_users),
      questions: cleanArray(questions),
      related_products: cleanArray(related_products),
      bundles: cleanArray(bundles),
      vector_embedding: cleanArray(vector_embedding),
      popularity_score: popularity_score ? Number(popularity_score) : 0,
      meta_title,
      meta_description,
      updatedBy,
      version: version ? Number(version) : 1,
      admin_notes,
      updatedAt: Date.now(),
    };

    if (req.files) {
      if (req.files["product_image"] && req.files["product_image"][0]) {
        updatedFields.product_image = req.files[
          "product_image"
        ][0].path.replace(/\\/g, "/");
      }

      if (req.files["all_product_images"]) {
        updatedFields.all_product_images = req.files["all_product_images"].map(
          (file) => file.path.replace(/\\/g, "/")
        );
      }
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found." });
    }

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

// 🔥 Add this function properly
exports.searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const products = await Product.find({
      isDeleted: false,
      $or: [
        { product_name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { brand: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
        { color: { $regex: query, $options: "i" } },
        { material: { $regex: query, $options: "i" } },
        { meta_title: { $regex: query, $options: "i" } },
        { meta_description: { $regex: query, $options: "i" } },
      ],
    }).populate("category subcategory vendor");

    res.status(200).json(products);
  } catch (error) {
    console.error("Search Products Error:", error.message);
    res.status(500).json({ message: "Failed to search products" });
  }
};
