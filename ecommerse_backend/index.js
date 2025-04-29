// 1 import all libraries.
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken"); // For token verification
const path = require("path");
const fs = require("fs");
const bcrypt = require("bcrypt");

const userRoutes = require("./routes/UserRoutes");
const activityRoutes = require("./routes/ActivityRoutes");
const entityCountRoutes = require("./routes/EntityCountRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const subCategoryRoutes = require("./routes/SubCategoryRoutes");
const outletRoutes = require("./routes/OutletRoutes");
const vendorRoutes = require("./routes/VendorRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/OrderRoutes");

// 2. give a name to your api backend. app = express()
dotenv.config();
const app = express();
// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"], // Replace with your frontend's URL
    credentials: true, // Enable credentials
  })
);

app.use(express.json()); // Add this middleware to parse JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api", userRoutes);
app.use("/api", activityRoutes);
app.use("/api", categoryRoutes);
app.use("/api", outletRoutes);
app.use("/api", vendorRoutes);
app.use("/api", entityCountRoutes);
app.use("/api", subCategoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// 8. port number 3006
const PORT = process.env.PORT;

// 9 . connect to mongodb.
mongoose
  .connect("mongodb://127.0.0.1:27017/ecommerse")
  .then(() => {
    console.log("Connected to mongodb.");
  })
  .catch((err) => {
    console.log("Connection to mongodb failed,", err);
  });

// 10. app.listen(port)
app.listen(PORT, () => {
  console.log(`Connected to server successfully at port number ${PORT}`);
});
