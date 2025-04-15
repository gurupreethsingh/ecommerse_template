import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  FaTh,
  FaAlignLeft,
  FaAlignRight,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [view, setView] = useState("right-sidebar");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `${globalBackendRoute}/api/single-blogs/${id}`
        );
        setBlog(preprocessBlogDescription(response.data));
      } catch (error) {
        console.error(
          "Error fetching the blog:",
          error.response || error.message
        );
      }
    };

    fetchBlog();
  }, [id]);

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      try {
        const response = await axios.get(`${globalBackendRoute}/api/all-blogs`);
        setRelatedBlogs(response.data);
        setFilteredBlogs(response.data);
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    fetchRelatedBlogs();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = relatedBlogs.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(relatedBlogs);
    }
  }, [searchTerm, relatedBlogs]);

  const preprocessBlogDescription = (blog) => {
    if (!blog || !blog.body) return blog;

    const paragraphs = blog.body.split("\n");
    const sections = [];
    let currentSection = [];

    paragraphs.forEach((paragraph) => {
      const trimmed = paragraph.trim();

      if (trimmed.endsWith("?")) {
        if (currentSection.length > 0) {
          sections.push(currentSection);
          currentSection = [];
        }
        sections.push([{ type: "question", text: trimmed }]);
      } else if (
        currentSection.length > 0 &&
        currentSection[0].type === "question"
      ) {
        sections.push([{ type: "answer", text: trimmed }]);
      } else {
        currentSection.push({ type: "text", text: trimmed });
      }
    });

    if (currentSection.length > 0) {
      sections.push(currentSection);
    }

    return { ...blog, processedBody: sections };
  };

  const renderDescription = () => {
    if (!blog || !blog.processedBody) return null;

    return blog.processedBody.map((section, index) => (
      <div key={index} className="mb-8">
        {section.map((content, idx) => {
          if (content.type === "question") {
            return (
              <p key={idx} className="font-bold text-lg mb-4 mt-6">
                {content.text}
              </p>
            );
          } else if (content.type === "answer") {
            return (
              <blockquote
                key={idx}
                className="border-l-4 border-blue-500 pl-4 text-gray-700 italic mb-6"
              >
                {content.text}
              </blockquote>
            );
          } else {
            return (
              <p key={idx} className="text-gray-800 text-lg mb-4">
                {content.text}
              </p>
            );
          }
        })}
      </div>
    ));
  };

  const renderSidebar = () => (
    <div className="p-4 mt-4 lg:w-80 border border-gray-200 rounded-md">
      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      {/* Related Blogs */}
      <h3 className="text-lg font-bold mb-4 text-left border-b">
        Latest Blogs
      </h3>
      <ul className="mb-4">
        {filteredBlogs
          .filter((relatedBlog) => relatedBlog._id !== blog?._id)
          .map((relatedBlog) => (
            <li
              key={relatedBlog._id}
              className="flex items-center mb-4 cursor-pointer border-b"
              onClick={() => navigate(`/single-blog/${relatedBlog._id}`)}
            >
              <img
                src={
                  relatedBlog.featuredImage || "https://via.placeholder.com/100"
                }
                alt={relatedBlog.title}
                className="w-12 h-12 mr-2 rounded-md"
              />
              <div className="text-sm">
                <Link to={`/single-blog/${relatedBlog._id}`}>
                  {relatedBlog.title}
                </Link>
              </div>
            </li>
          ))}
      </ul>

      {/* Categories */}
      <h3 className="text-lg font-bold mb-2 text-left border-b">Categories</h3>
      <ul className="mb-4">
        {blog && blog.category && (
          <li key={blog.category} className="mb-2 text-left">
            {blog.category}
          </li>
        )}
      </ul>

      {/* Tags */}
      <h3 className="text-lg font-bold mb-2 text-left border-b">Tags</h3>
      <div className="flex flex-wrap">
        {blog &&
          blog.tags &&
          blog.tags.map((tag, index) => (
            <button
              key={index}
              className="text-xs bg-gray-200 text-gray-700 p-2 mr-2 mb-2 rounded"
            >
              {tag}
            </button>
          ))}
      </div>
    </div>
  );

  // Function to handle navigation
  const handlePreviousNextNavigation = (direction) => {
    const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);
    if (direction === "previous") {
      const prevIndex =
        currentIndex === 0 ? relatedBlogs.length - 1 : currentIndex - 1;
      navigate(`/single-blog/${relatedBlogs[prevIndex]._id}`);
    } else {
      const nextIndex =
        currentIndex === relatedBlogs.length - 1 ? 0 : currentIndex + 1;
      navigate(`/single-blog/${relatedBlogs[nextIndex]._id}`);
    }
  };

  // Function to get titles of previous and next blogs
  const getPrevNextTitles = () => {
    const currentIndex = relatedBlogs.findIndex((b) => b._id === blog?._id);
    const prevIndex =
      currentIndex === 0 ? relatedBlogs.length - 1 : currentIndex - 1;
    const nextIndex =
      currentIndex === relatedBlogs.length - 1 ? 0 : currentIndex + 1;
    return {
      prevTitle: relatedBlogs[prevIndex]?.title || "",
      nextTitle: relatedBlogs[nextIndex]?.title || "",
    };
  };

  const { prevTitle, nextTitle } = getPrevNextTitles();

  if (!blog) return <div>Loading...</div>;

  return (
    <motion.div
      className="max-w-7xl mx-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        <div className="flex space-x-2">
          <FaTh
            className={`cursor-pointer ${
              view === "wide" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setView("wide")}
          />
          <FaAlignLeft
            className={`cursor-pointer ${
              view === "left-sidebar" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setView("left-sidebar")}
          />
          <FaAlignRight
            className={`cursor-pointer ${
              view === "right-sidebar" ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setView("right-sidebar")}
          />
        </div>
      </div>
      <p className="text-gray-600 mb-4 text-left">{`Published on ${new Date(
        blog.publishedDate
      ).toLocaleDateString()}`}</p>

      <div className="flex lg:flex-row flex-col">
        {view === "left-sidebar" && (
          <div className="lg:w-1/4 w-full lg:mr-8 mb-8 lg:mb-0">
            {renderSidebar()}
          </div>
        )}
        <div className="flex-1 p-3">
          <motion.img
            src={
              blog.featuredImage
                ? `${globalBackendRoute}/${blog.featuredImage.replace(
                    /\\/g,
                    "/"
                  )}`
                : "https://via.placeholder.com/800x400"
            }
            alt={blog.title}
            className="w-full h-auto object-cover rounded"
          />
          <div className="p-3 w-full break-words whitespace-pre-line overflow-x-auto">
            {renderDescription()}
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
            <button
              onClick={() => handlePreviousNextNavigation("previous")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center shadow"
            >
              <FaArrowLeft className="mr-2" />
              <span className="text-sm font-medium text-left">{prevTitle}</span>
            </button>

            <button
              onClick={() => handlePreviousNextNavigation("next")}
              className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center shadow"
            >
              <span className="text-sm font-medium text-right">
                {nextTitle}
              </span>
              <FaArrowRight className="ml-2" />
            </button>
          </div>
        </div>
        {view === "right-sidebar" && (
          <div className="lg:w-1/4 w-full lg:ml-8 mb-8 lg:mb-0">
            {renderSidebar()}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SingleBlog;
