const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null, // For unauthenticated users
  },
  sessionId: {
    type: String,
    required: true,
  },
  ipAddress: { type: String },
  userAgent: { type: String },
  activities: [
    {
      page: { type: String },
      enteredAt: { type: Date },
      exitedAt: { type: Date },
      durationInSeconds: { type: Number },
    },
  ],
  loginAt: { type: Date },
  logoutAt: { type: Date },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserActivity = mongoose.model("UserActivity", activitySchema);

module.exports = UserActivity;