import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalPosts: number;
  postsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  setCurrentPage,
  totalPosts,
  postsPerPage,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const pagesPerGroup = 3;
  const totalGroups = Math.ceil(pageNumbers.length / pagesPerGroup);
  const currentGroup = Math.ceil(currentPage / pagesPerGroup);

  const startPage = (currentGroup - 1) * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, pageNumbers.length);

  const currentPages = pageNumbers.slice(startPage - 1, endPage);

  return (
    <div className="flex justify-center my-4 ">
      <button
        className="px-2 py-1 mx-1 border"
        onClick={() => setCurrentPage((currentGroup - 2) * pagesPerGroup + 1)}
        disabled={currentGroup === 1}
      >
        Prev
      </button>
      {currentPages.map((number) => (
        <button
          key={number}
          className={`px-2 py-1 mx-1 border ${
            number === currentPage ? "bg-gray-300" : ""
          }`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}
      <button
        className="px-2 py-1 mx-1 border"
        onClick={() => setCurrentPage(currentGroup * pagesPerGroup + 1)}
        disabled={currentGroup === totalGroups}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
