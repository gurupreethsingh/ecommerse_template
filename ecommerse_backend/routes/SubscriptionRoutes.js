// subscriptionRoutes.js

const express = require("express");
const {
  subscribe,
  getAllSubscriptions,
  unsubscribe,
  resubscribe,
  getSubscriptionCount,
} = require("../controllers/SubscriptionController");

const router = express.Router();

router.post("/subscribe", subscribe);
router.get("/all-subscriptions", getAllSubscriptions);
router.post("/unsubscribe", unsubscribe);
router.post("/resubscribe", resubscribe);
router.get("/subscription-count", getSubscriptionCount);

module.exports = router;
