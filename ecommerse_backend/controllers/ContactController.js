const ContactModel = require("../models/ContactModel");
const nodemailer = require("nodemailer");

// Function to send a reply notification email
const sendReplyEmail = (userEmail, userName, originalMessage, replyContent) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: "New Reply to Your Message",
    text: `Dear ${userName},\n\nWe have responded to your message: "${originalMessage}".\n\nReply from our team:\n"${replyContent}"\n\nThank you for reaching out to us.\n\nBest regards,\nEcoders Team`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error("Error sending reply email:", err);
      return;
    }
    console.log("Reply email sent successfully:", info.response);
  });
};

// Controller to add a contact message
exports.addContactMessage = async (req, res) => {
  // Change made here
  try {
    const { firstName, lastName, email, phone, message_text, agreeToLicense } =
      req.body;

    if (!email || !firstName || !lastName || !message_text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newContactMessage = new ContactModel({
      firstName,
      lastName,
      email,
      phone,
      message_text,
      agreeToLicense,
    });

    await newContactMessage.save();
    res
      .status(201)
      .json({ message: "Contact message successfully submitted!" });
  } catch (error) {
    console.error("Error saving contact message:", error);
    res.status(500).json({
      error: "An error occurred while submitting the contact message.",
    });
  }
};

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await ContactModel.find().sort({ createdAt: -1 }).lean();
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error retrieving messages:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while fetching messages." });
  }
};

// Controller to get a single message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await ContactModel.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });
    res.status(200).json(message);
  } catch (error) {
    console.error("Error retrieving message:", error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the message." });
  }
};

// Controller to add a reply to a message and send an email notification
exports.addReplyToMessage = async (req, res) => {
  try {
    const message = await ContactModel.findById(req.params.id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    // Use the email from the original message if not provided in the request
    const replyEmail = req.body.email || message.email;

    // Construct the new reply object
    const newReply = {
      name: req.body.name,
      email: replyEmail,
      message: req.body.message,
      timestamp: new Date(),
    };

    // Add the new reply to the message's replies array and save it to the database
    message.replies.push(newReply);
    await message.save();

    // Send the reply notification email
    sendReplyEmail(
      message.email,
      message.firstName,
      message.message_text,
      newReply.message
    );

    res.status(200).json({ message: "Reply added successfully", newReply });
  } catch (error) {
    console.error("Error adding reply:", error);
    res
      .status(500)
      .json({ error: "An error occurred while adding the reply." });
  }
};

// Controller to get the count of unread messages
exports.getUnreadMessagesCount = async (req, res) => {
  try {
    const unreadCount = await ContactModel.countDocuments({ isRead: false });
    res.json({ unreadCount });
  } catch (error) {
    console.error("Error fetching unread messages count:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Controller to mark a message as read
exports.markMessageAsRead = async (req, res) => {
  try {
    const { messageId } = req.body;

    if (!messageId) {
      return res.status(400).json({ error: "Message ID is required" });
    }

    const result = await ContactModel.updateOne(
      { _id: messageId },
      { $set: { isRead: true } }
    );

    if (result.nModified === 0) {
      return res
        .status(404)
        .json({ error: "Message not found or already marked as read" });
    }

    res.status(200).json({ success: true, message: "Message marked as read" });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to get the count of all messages (read and unread)
exports.getMessagesCount = async (req, res) => {
  try {
    // Get the count of all messages
    const totalMessagesCount = await ContactModel.countDocuments();

    // Get the count of unread messages
    const unreadMessagesCount = await ContactModel.countDocuments({
      isRead: false,
    });

    // Get the count of read messages
    const readMessagesCount = totalMessagesCount - unreadMessagesCount;

    res.status(200).json({
      totalMessages: totalMessagesCount,
      unreadMessages: unreadMessagesCount,
      readMessages: readMessagesCount,
    });
  } catch (error) {
    console.error("Error fetching message counts:", error);
    res.status(500).json({ error: "An error occurred while fetching counts." });
  }
};
