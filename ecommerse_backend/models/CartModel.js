exports.getCart = async (req, res) => {
    try {
      const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");
      if (!cart) return res.status(200).json({ items: [] });
  
      // Build proper response
      const formattedItems = cart.items.map(item => ({
        _id: item.product._id,
        product_name: item.product.product_name,
        selling_price: item.product.selling_price,
        display_price: item.product.display_price,
        product_image: item.product.product_image,
        availability_status: item.product.availability_status,
        quantity: item.quantity,
      }));
  
      res.json({ items: formattedItems });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };