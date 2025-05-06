// controllers/AddressController.js
const Address = require("../models/AddressModel");

// Get all addresses for a user
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new address
exports.addAddress = async (req, res) => {
  try {
    const {
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (isDefault) {
      // Set existing addresses of the same type to isDefault: false
      await Address.updateMany(
        { user: req.user.id, type },
        { isDefault: false }
      );
    }

    const newAddress = new Address({
      user: req.user.id,
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new address for a guest user
exports.addGuestAddress = async (req, res) => {
  try {
    const {
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      guestName,
      guestEmail,
      guestPhone,
    } = req.body;

    // Validate required guest fields
    if (!guestName || !guestEmail || !guestPhone) {
      return res
        .status(400)
        .json({ message: "Guest name, email, and phone are required." });
    }

    const newAddress = new Address({
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      guestName,
      guestEmail,
      guestPhone,
    });

    await newAddress.save();
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing address
exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      type,
      addressLine1,
      addressLine2,
      city,
      state,
      postalCode,
      country,
      isDefault,
    } = req.body;

    if (isDefault) {
      // Set existing addresses of the same type to isDefault: false
      await Address.updateMany(
        { user: req.user.id, type },
        { isDefault: false }
      );
    }

    const updatedAddress = await Address.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        type,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        country,
        isDefault,
      },
      { new: true }
    );

    res.status(200).json(updatedAddress);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete an address
exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    await Address.findOneAndDelete({ _id: id, user: req.user.id });
    res.status(200).json({ message: "Address deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};
