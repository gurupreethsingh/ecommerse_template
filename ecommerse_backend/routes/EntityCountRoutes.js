// routes/CountRoutes.js
const express = require("express");
const router = express.Router();
const { getAllEntityCounts } = require("../controllers/EntityCountController");

router.get("/get-entity-counts", getAllEntityCounts);

module.exports = router;
