const Order = require("../models/OrderModel");

// Place a new order (Guest or Logged-in)
// ✅ Use req.user.id instead of req.body.userId
exports.placeOrder = async (req, res) => {
  try {
    const { billingAddress, shippingAddress, items, totalAmount, userId } =
      req.body;

    if (!billingAddress || !shippingAddress || !items || items.length === 0) {
      return res.status(400).json({ message: "Missing order information" });
    }

    const newOrder = new Order({
      user: req.user?.id || null, // ✅ If user is logged in, use passed ID; else null for guests
      billingAddress,
      shippingAddress,
      items,
      totalAmount,
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    await newOrder.save();

    res
      .status(201)
      .json({ message: "Order placed successfully", orderId: newOrder._id });
  } catch (error) {
    console.error("Error placing order:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// Fetch only logged-in user's orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json({ orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Place a new order as guest
exports.placeGuestOrder = async (req, res) => {
  try {
    const {
      billingAddress,
      shippingAddress,
      items,
      totalAmount,
      guestName,
      guestEmail,
      guestPhone,
    } = req.body;

    if (
      !guestName ||
      !guestEmail ||
      !guestPhone ||
      !billingAddress ||
      !shippingAddress ||
      !items ||
      items.length === 0 ||
      !totalAmount
    ) {
      return res.status(400).json({ message: "Missing guest order details" });
    }

    const newOrder = new Order({
      user: null, // 🔒 No user ref
      guestName,
      guestEmail,
      guestPhone,
      billingAddress,
      shippingAddress,
      items,
      totalAmount,
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    await newOrder.save();

    res.status(201).json({
      message: "Guest order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Guest order error:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ Fetch all guest orders (Admin-only)
exports.getAllGuestOrders = async (req, res) => {
  try {
    const guestOrders = await Order.find({ user: null }).sort({
      createdAt: -1,
    });
    res.status(200).json({ guestOrders });
  } catch (error) {
    console.error("Error fetching guest orders:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};
