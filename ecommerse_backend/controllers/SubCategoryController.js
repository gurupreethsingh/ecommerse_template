const SubCategory = require("../models/SubCategoryModel");
const Category = require("../models/CategoryModel");

// Create a new subcategory
const addSubCategory = async (req, res) => {
  try {
    const { subcategory_name, category } = req.body;

    const newSubCategory = new SubCategory({
      subcategory_name,
      category,
    });

    await newSubCategory.save();

    res.status(201).json({
      message: "Subcategory created successfully",
      subcategory: newSubCategory,
    });
  } catch (error) {
    console.error("Error adding subcategory:", error);
    res.status(500).json({ message: "Error adding subcategory" });
  }
};

// Get all subcategories
const getAllSubCategories = async (req, res) => {
  try {
    const subcategories = await SubCategory.find({ isDeleted: false }).populate("category");
    res.status(200).json(subcategories);
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({ message: "Error fetching subcategories" });
  }
};

// Get single subcategory by ID
const getSubCategoryById = async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(req.params.id).populate("category");
    if (!subcategory || subcategory.isDeleted) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(subcategory);
  } catch (error) {
    console.error("Error fetching subcategory:", error);
    res.status(500).json({ message: "Error fetching subcategory" });
  }
};

// Update subcategory
const updateSubCategory = async (req, res) => {
  try {
    const { subcategory_name, category } = req.body;
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory || subcategory.isDeleted) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    subcategory.subcategory_name = subcategory_name || subcategory.subcategory_name;
    subcategory.category = category || subcategory.category;
    subcategory.updatedAt = Date.now();

    const updated = await subcategory.save();

    res.status(200).json({
      message: "Subcategory updated successfully",
      subcategory: updated,
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({ message: "Error updating subcategory" });
  }
};

// Soft delete subcategory
const deleteSubCategory = async (req, res) => {
  try {
    const subcategory = await SubCategory.findById(req.params.id);
    if (!subcategory || subcategory.isDeleted) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    subcategory.isDeleted = true;
    await subcategory.save();

    res.status(200).json({ message: "Subcategory soft-deleted successfully" });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({ message: "Error deleting subcategory" });
  }
};

// Count all subcategories
const countAllSubCategories = async (req, res) => {
  try {
    const count = await SubCategory.countDocuments();
    res.status(200).json({ total_subcategories: count });
  } catch (error) {
    res.status(500).json({ message: "Error counting subcategories" });
  }
};

// Count non-deleted subcategories
const countActiveSubCategories = async (req, res) => {
  try {
    const count = await SubCategory.countDocuments({ isDeleted: false });
    res.status(200).json({ active_subcategories: count });
  } catch (error) {
    res.status(500).json({ message: "Error counting active subcategories" });
  }
};

// Count subcategories per category
const countSubCategoriesPerCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    const counts = await Promise.all(
      categories.map(async (cat) => {
        const count = await SubCategory.countDocuments({ category: cat._id });
        return {
          categoryId: cat._id,
          categoryName: cat.category_name,
          subcategoryCount: count,
        };
      })
    );
    res.status(200).json(counts);
  } catch (error) {
    console.error("Error counting subcategories per category:", error);
    res.status(500).json({ message: "Error counting subcategories per category" });
  }
};

module.exports = {
  addSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
  deleteSubCategory,
  countAllSubCategories,
  countActiveSubCategories,
  countSubCategoriesPerCategory,
};
