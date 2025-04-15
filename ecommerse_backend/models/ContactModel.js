// models/ContactMessage.js

const mongoose = require("mongoose");

const ReplySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ContactMessageSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    message_text: {
      type: String,
      required: true,
      trim: true,
    },
    agreeToLicense: {
      type: Boolean,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: false, // Default to false meaning the message is unread
    },
    replies: [ReplySchema],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contacts", ContactMessageSchema);
