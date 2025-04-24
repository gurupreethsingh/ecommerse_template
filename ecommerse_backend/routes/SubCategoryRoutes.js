const express = require("express");
const router = express.Router();
const controller = require("../controllers/SubCategoryController");

router.post("/add-sub-category", controller.addSubCategory);
router.get("/all-subcategories", controller.getAllSubCategories);
router.get("/get-subcategory-by-id/:id", controller.getSubCategoryById);
router.put("/update-subcategory/:id", controller.updateSubCategory);
router.delete("/delete-subcategory/:id", controller.deleteSubCategory);
router.get("/count-all-subcategories", controller.countAllSubCategories);
router.get("/count-active-subcategories", controller.countActiveSubCategories);
router.get("/count-subcategories-by-category", controller.countSubCategoriesPerCategory);

module.exports = router;
