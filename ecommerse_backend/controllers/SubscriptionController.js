// subscriptionController.js

const Subscription = require("../models/SubscriptionModel");

// Handle new subscriptions
const subscribe = async (req, res) => {
  const { email, subscriptionType } = req.body;

  try {
    let subscription = await Subscription.findOne({ email });

    if (subscription && subscription.isActive) {
      return res.status(400).json({ message: "Email is already subscribed." });
    }

    if (subscription && !subscription.isActive) {
      // Reactivate subscription if previously canceled
      subscription.isActive = true;
      subscription.subscriptionType = subscriptionType;
      subscription.canceledAt = null;
      await subscription.save();
    } else {
      // Create a new subscription
      subscription = new Subscription({
        email,
        subscriptionType,
      });
      await subscription.save();
    }

    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Fetch all subscriptions
const getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Subscription.find({});
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Cancel subscription
const unsubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    const subscription = await Subscription.findOne({ email });
    if (!subscription || !subscription.isActive) {
      return res
        .status(404)
        .json({ message: "Subscription not found or already canceled." });
    }
    await subscription.cancelSubscription();
    res.status(200).json({ message: "Unsubscribed successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Resubscribe
const resubscribe = async (req, res) => {
  const { email } = req.body;

  try {
    let subscription = await Subscription.findOne({ email });
    if (!subscription) {
      return res.status(404).json({ message: "Subscription not found." });
    }
    subscription.isActive = true;
    subscription.canceledAt = null;
    await subscription.save();
    res.status(200).json({ message: "Resubscribed successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get total subscription count
const getSubscriptionCount = async (req, res) => {
  try {
    const count = await Subscription.countDocuments({ isActive: true });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error fetching subscription count:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  subscribe,
  getAllSubscriptions,
  unsubscribe,
  resubscribe,
  getSubscriptionCount,
};
