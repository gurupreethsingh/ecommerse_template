// functions. 
const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// registering a new user , into the application code is working perfectly fine.
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
      // Check if the user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists" });
      }
  
      // Create a new user
      user = new User({
        name,
        email,
        password,
      });
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
  
      // Save the user to the database
      await user.save();
  
      res.status(201).json({ msg: "User registered successfully" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  };

  const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if both fields are provided
      if (!email || !password) {
        return res.status(400).json({ message: "All Fields Are Required." });
      }
  
      // Check if the user exists
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({ message: "User not found." });
      }
  
      // Compare passwords
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid credentials." });
      }
  
      // If password is correct, generate token
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      // Send successful response
      return res.status(200).json({
        message: "User login successful",
        token,
        user: {
          id: user._id,
          name: user.name,
          role: user.role,
        }
      });
    } catch (error) {
      console.error("Login error:", error.message);
      return res.status(500).send("Server error");
    }
  };
  

  module.exports = {
    register, login
  }