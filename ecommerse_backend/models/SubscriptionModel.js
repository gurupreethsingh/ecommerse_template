const mongoose = require("mongoose");

const SubscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  subscriptionType: {
    type: String,
    enum: ["daily", "weekly", "monthly", "yearly"],
    required: true,
    default: "weekly",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  canceledAt: {
    type: Date,
  },
});

SubscriptionSchema.methods.cancelSubscription = function () {
  this.isActive = false;
  this.canceledAt = Date.now();
  return this.save();
};

module.exports = mongoose.model("Subscription", SubscriptionSchema);
