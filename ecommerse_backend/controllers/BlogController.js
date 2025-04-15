const Blog = require("../models/BlogModel");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Configure Multer for blog image uploads
const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/blogs";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const blogUpload = multer({ storage: blogStorage });

// Add a new blog
const addBlog = async (req, res) => {
  try {
    const {
      title,
      body,
      author,
      summary,
      tags,
      category,
      seoTitle,
      metaDescription,
      published,
    } = req.body;

    // Store only the relative path for the image
    const featuredImage = req.file ? req.file.path.replace(/\\/g, "/") : "";

    const newBlog = new Blog({
      title,
      body,
      author,
      summary,
      tags,
      category,
      seoTitle,
      metaDescription,
      published,
      featuredImage,
      publishedDate: published ? new Date() : null,
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog added successfully", blog: newBlog });
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().lean();

    // Add server URL to the featuredImage path if needed
    const modifiedBlogs = blogs.map((blog) => {
      if (blog.featuredImage) {
        blog.featuredImage = `${req.protocol}://${req.get("host")}/${
          blog.featuredImage
        }`;
      }
      return blog;
    });

    res.status(200).json(modifiedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Fetch a single blog by ID
const getBlogById = async (req, res) => {
  try {
    const blogId = req.params.id;

    const blog = await Blog.findById(blogId)
      .populate("author", "name")
      .populate("comments.postedBy", "name");

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching the blog" });
  }
};

module.exports = {
  blogUpload,
  addBlog,
  getAllBlogs,
  getBlogById,
};
