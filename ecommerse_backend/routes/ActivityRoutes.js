// routes/userActivityRoutes.js
const express = require("express");
const {
  logLogin,
  logLogout,
  logPageVisit,
} = require("../controllers/ActivityController");

const router = express.Router();

router.post("/log-login", logLogin);
router.post("/log-logout", logLogout);
router.post("/log-page", logPageVisit);

module.exports = router;
