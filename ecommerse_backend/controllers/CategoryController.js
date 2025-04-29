const Category = require("../models/CategoryModel");
const Product = require("../models/ProductModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join("uploads", "category_images");

// Ensure directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage for category images
const categoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const filename =
      file.fieldname + "-" + Date.now() + path.extname(file.originalname);
    cb(null, filename);
  },
});

const categoryUpload = multer({ storage: categoryStorage });

// Add new category
const addCategory = async (req, res) => {
  try {
    const { category_name } = req.body;
    const category_image = req.file
      ? path.join(uploadDir, req.file.filename).replace(/\\/g, "/")
      : "";

    const newCategory = new Category({ category_name, category_image });
    await newCategory.save();

    res.status(201).json({
      message: "Category added successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Error adding category" });
  }
};


// Get all categories
// ✅ FINAL getAllCategories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}, "category_name category_image");

    const formattedCategories = categories.map((cat) => ({
      _id: cat._id,
      name: cat.category_name, // important for shop page, search, filters
      category_name: cat.category_name, // important for display (safe fallback)
      category_image: cat.category_image, // important for AllCategories page
    }));

    res.status(200).json(formattedCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};



// Get category by ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ message: "Error fetching category" });
  }
};

// Update category (with optional image update)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_name } = req.body;

    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Remove old image if new image is provided
    if (req.file && category.category_image) {
      const oldPath = path.join(__dirname, "..", category.category_image);
      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    // Update category fields
    category.category_name = category_name || category.category_name;
    if (req.file) {
      category.category_image = path
        .join(uploadDir, req.file.filename)
        .replace(/\\/g, "/");
    }

    const updatedCategory = await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ message: "Error updating category" });
  }
};

// Delete category and image
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Delete image if it exists
    if (category.category_image) {
      const imagePath = path.join(__dirname, "..", category.category_image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Category.findByIdAndDelete(id);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ message: "Error deleting category" });
  }
};

// Get total category count
const getCategoryCount = async (req, res) => {
  try {
    const categoryCount = await Category.countDocuments();
    res.status(200).json({ categoryCount });
  } catch (error) {
    console.error("Error counting categories:", error);
    res.status(500).json({ message: "Error counting categories" });
  }
};

// Get product count per category
const getCategoryProductCounts = async (req, res) => {
  try {
    const categories = await Category.find();

    const counts = await Promise.all(
      categories.map(async (category) => {
        const productCount = await Product.countDocuments({
          category: category._id,
        });

        return {
          categoryId: category._id,
          categoryName: category.category_name,
          productCount,
        };
      })
    );

    res.status(200).json(counts);
  } catch (error) {
    console.error("Error fetching product counts:", error);
    res.status(500).json({ message: "Error fetching product counts" });
  }
};

module.exports = {
  categoryUpload,
  addCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryCount,
  getCategoryProductCounts,
};
