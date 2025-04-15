// import React from "react";
// import { useNavigate } from "react-router-dom";
// import healthy_snacks from "../../assets/blog_images/healty_snaks.jpg";
// import white_snacks from "../../assets/blog_images/white_snacks.jpg";
// import EachBlog from "../../components/blog_components/EachBlog";

// const AllBlogs = () => {
//   const blogs = [
//     {
//       id: 1,
//       image: healthy_snacks,
//       date: "November 7, 2024",
//       title: "Snack Smart: How BonMillette Redefines Healthy Snacking",
//       content: `Gone are the days when snacking was synonymous with unhealthy indulgence. Today, health-conscious consumers are seeking snacks that satisfy their cravings while providing real nutrition. That’s where BonMillette steps in, redefining the snacking experience with its millet-based creations.

//         <strong>The Problem with Traditional Snacks:</strong>
//         Many store-bought snacks are loaded with refined sugars, maida, and unhealthy fats like palm oil. While they may taste great, they often leave you feeling sluggish and guilty.

//         <strong>Why BonMillette Stands Out:</strong>
//         - Natural Sweeteners: No added sugar here! BonMillette uses jaggery and date syrup to sweeten its products naturally.
//         - No Maida or Palm Oil: Unlike most snacks, BonMillette keeps things wholesome by avoiding refined ingredients.
//         - Millet Magic: All products are millet-based, ensuring you get the fiber, protein, and essential nutrients your body needs.

//         <strong>A Snack for Every Mood</strong>
//         . Feeling Sweet? Indulge in Millet Bliss or Omega Bites, perfect with a cup of tea.
//         . Craving Crunch? Grab some Ragi Pops or Millet Boondi Blast for a savory treat.
//         . Need Energy? The Popped Millet Energy Bar is your perfect on-the-go companion.

//         <strong>The BonMillette Promise</strong>
//         BonMillette doesn’t just make snacks; it creates experiences. Every bite is a celebration of flavor, health, and tradition. Whether you’re looking for a quick energy boost or a guilt-free indulgence, BonMillette has you covered.

//         <strong>Conclusion:</strong>
//         Snacking smart is no longer a challenge with BonMillette. With its unique range of products, this brand proves that healthy eating can be fun, delicious, and full of variety. So, the next time you’re hungry, don’t reach for a packet of chips—reach for BonMillette and snack your way to better health!.
//       `,
//       author: " -- By BonMillette",
//     },
//     {
//       id: 2,
//       image: white_snacks,
//       date: "November 8, 2024",
//       title: "Millets: The Ancient Grains Making a Modern Comeback",
//       content: `
//       In today’s fast-paced world, where processed and fast foods dominate our diets, there’s a quiet revolution happening on the plate. Millets—these humble, nutrient-packed grains— are reclaiming their rightful place in kitchens across India and the world.

//         <strong>What Are Millets?</strong>

//         Millets are a group of ancient grains that have been cultivated in India for centuries. These include Ragi (finger millet), Jowar (sorghum), Bajra (pearl millet), Kodo, and others. Once considered the staple diet of rural communities, millets are now being rediscovered for their incredible health benefits and adaptability to modern recipes.

//         <strong>Why the Sudden Popularity?</strong>

//         - Nutritional Powerhouses: Millets are packed with protein, dietary fiber, vitamins, and minerals.
//         - Low Glycemic Index: Ideal for diabetics, millets release energy slowly, keeping blood sugar levels in check.
//         - Versatility in Cooking: From fluffy upmas and crispy dosas to sweet laddus and energy bars, millets can be turned into a variety of delicious dishes.

//         <strong>Millets and Sustainability:</strong>

//         Besides their health benefits, millets are ecological heroes. They require less water to grow, are naturally pest-resistant, and thrive in arid conditions. Choosing millets is not just good for your body but also for the planet.

//         <strong>How BonMillette Is Making Millets Exciting Again:</strong>

//         At BonMillette, we blend tradition with innovation to create snacks that are not only healthy but irresistibly tasty. From Millet Bliss laddus to the Meltaway Millet pak, each product is crafted to bring the goodness of millets to your table without compromising on flavor.

//         <strong>Conclusion:</strong>

//         Millets are more than just a food trend—they’re a lifestyle choice. By incorporating these ancient grains into your diet, you’re nourishing your body and contributing to sustainable agriculture. So, why not make the switch today? With BonMillette, healthy eating has never been this delicious!
//       `,
//       author: " -- By BonMillette",
//     },
//   ];

//   const navigate = useNavigate();

//   const handleBlogClick = (blog) => {
//     navigate(`/single-blog/${blog.id}`, { state: blog });
//   };

//   return (
//     <div>
//       <div className="w-full md:w-5/6 mx-auto pt-5 pb-5">
//         <div className="row row-cols-1 row-cols-md-3 g-4">
//           {blogs.map((blog) => (
//             <div
//               key={blog.id}
//               className="cursor-pointer"
//               onClick={() => handleBlogClick(blog)}
//             >
//               <EachBlog
//                 image={blog.image}
//                 date={blog.date}
//                 title={blog.title}
//                 content={blog.content.replace(/<[^>]+>/g, "").split(". ")[0]} // Show first sentence
//                 author={blog.author}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AllBlogs;

//

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaThList,
  FaThLarge,
  FaTh,
  FaArrowLeft,
  FaArrowRight,
  FaCalendar,
  FaTags,
  FaUser,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import globalBackendRoute from "../../config/Config";

export default function AllBlogs() {
  const getImageUrl = (imagePath) => {
    if (imagePath) {
      // Replace backslashes with forward slashes and ensure proper relative path usage
      const normalizedPath = imagePath
        .replace(/\\/g, "/")
        .split("uploads/")
        .pop();
      return `${globalBackendRoute}/uploads/${normalizedPath}`;
    }
    return "https://via.placeholder.com/150"; // Fallback if there's no image
  };

  const [view, setView] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [blogs, setBlogs] = useState([]); // State for all blogs
  const [filteredBlogs, setFilteredBlogs] = useState([]); // State for filtered blogs
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch all blogs from the backend
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${globalBackendRoute}/api/all-blogs`);
        setBlogs(response.data);
        setFilteredBlogs(response.data); // Initially, all blogs are shown
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = blogs
      .filter((blog) => {
        // Check if blog properties are defined before applying toLowerCase
        const titleMatch = blog.title?.toLowerCase().includes(value);
        const authorMatch = blog.author?.name?.toLowerCase().includes(value);
        const categoryMatch = blog.category?.toLowerCase().includes(value);
        const tagsMatch = blog.tags?.some((tag) =>
          tag.toLowerCase().includes(value)
        );

        return titleMatch || authorMatch || categoryMatch || tagsMatch;
      })
      .sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    setFilteredBlogs(filtered);
    setCurrentPage(1); // Reset to first page after search
  };

  // Define paginatedBlogs here based on the current page and items per page
  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const iconStyle = {
    list: view === "list" ? "text-blue-500" : "text-gray-500",
    grid: view === "grid" ? "text-green-500" : "text-gray-500",
    card: view === "card" ? "text-purple-500" : "text-gray-500",
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Blogs</h2>
        <div className="flex space-x-4 items-center">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-64 rounded-md border border-gray-300 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
          <FaThList
            className={`cursor-pointer ${iconStyle.list}`}
            onClick={() => setView("list")}
          />
          <FaTh
            className={`cursor-pointer ${iconStyle.card}`}
            onClick={() => setView("card")}
          />
          <FaThLarge
            className={`cursor-pointer ${iconStyle.grid}`}
            onClick={() => setView("grid")}
          />
        </div>
      </div>

      <motion.div
        className={`grid gap-6 ${
          view === "list"
            ? "grid-cols-1"
            : view === "grid"
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {paginatedBlogs.map((blog) => (
          <Link key={blog._id} to={`/single-blog/${blog._id}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden ${
                view === "list" ? "flex items-center p-4" : ""
              }`}
            >
              <img
                src={getImageUrl(blog.featuredImage)}
                alt={blog.title}
                className={`${
                  view === "list"
                    ? "w-24 h-24 object-cover mr-4"
                    : "w-full h-48 object-cover mb-4"
                }`}
              />
              <div className={`${view === "list" ? "flex-1" : "p-4"}`}>
                <h3 className="text-lg font-bold text-gray-900 mb-2 text-left">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaCalendar className="mr-1 text-yellow-500" />
                  {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaUser className="mr-1 text-red-500" />
                  {blog.author.name}
                </p>
                <p className="text-sm text-gray-600 mb-2 flex items-center">
                  <FaTags className="mr-1 text-green-500" />
                  {blog.tags.join(", ")}
                </p>
                {view !== "list" && (
                  <p className="text-gray-700">{blog.summary}</p>
                )}
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {filteredBlogs.length === 0 && (
        <p className="text-center text-gray-600 mt-6">No blogs found.</p>
      )}

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === 1
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <FaArrowLeft />
          <span>Previous</span>
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-white ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-indigo-600 hover:bg-indigo-500"
          }`}
        >
          <span>Next</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
