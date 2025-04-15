const express = require("express");
const router = express.Router();
const ContactController = require("../controllers/ContactController");

// Route to add a contact message
router.post("/add-contact-message", ContactController.addContactMessage);

// Route to get all contact messages
router.get("/all-messages", ContactController.getAllMessages);

// Route to get a single message by ID
router.get("/reply-message/:id", ContactController.getMessageById);

// Route to add a reply to a specific message
router.post(
  "/give-message-reply/:id/reply",
  ContactController.addReplyToMessage
);

// Route to get the count of unread messages
router.get("/messages/unread-count", ContactController.getUnreadMessagesCount);

// Route to mark a message as read
router.post("/messages/mark-as-read", ContactController.markMessageAsRead);

// to get the count of each and every message.
router.get("/messages/get-messages-count", ContactController.getMessagesCount);

module.exports = router;
