import React from "react";

const Pagination = ({ pages, currentPage, setCurrentPage }) => {
  const arr = [];
  for (let index = 1; index <= pages; index++) {
    arr.push(index);
  }
  const handlePage = (number) => {
    setCurrentPage(number);
  };
  console.log(currentPage, "curent");
  return (
    <div className="inline-flex -space-x-px text-sm mt-4">
      <button
        className="disabled:opacity-25 flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        disabled={currentPage <= 1}
        onClick={() => handlePage(currentPage - 1)}
      >
        Prev
      </button>
      {arr &&
        arr?.map((ele) => (
          <button
            className={`flex items-center justify-center px-3 h-8 ${
              ele === currentPage && "text-blue-600 bg-blue-50"
            } border border-gray-300  hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}
            onClick={() => handlePage(ele)}
          >
            {ele}
          </button>
        ))}
      <button
        className="disabled:opacity-25 flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        disabled={currentPage >= pages}
        onClick={() => handlePage(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
