import React from "react";

const Pagination = ({ productsPerPage, totalProducts, currentPage, paginate }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  if (totalPages <= 1) return null; // Don't show pagination if only 1 page

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="inline-flex space-x-1">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-4 py-2 rounded-md border ${
              currentPage === number
                ? "bg-gray-900 text-white"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }`}
          >
            {number}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Pagination;
