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
      user: userId || null, // ✅ If user is logged in, use passed ID; else null for guests
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
