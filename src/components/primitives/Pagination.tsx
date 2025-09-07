"use client";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 페이지 번호들을 배열로 만듭니다. 예: [1, 2, 3, 4, 5]
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex justify-center items-center gap-4 text-gray-700">
      {/* 이전 페이지로 가는 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        aria-label="Previous Page"
      >
        &lt;
      </button>

      {/* 페이지 번호 버튼들 */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-3 py-1 rounded-md text-lg ${
            currentPage === number
              ? "font-bold text-blue-600 border-b-2 border-blue-600" // 현재 페이지 스타일
              : "font-medium text-gray-500 hover:text-blue-600"
          }`}
        >
          {number}
        </button>
      ))}

      {/* 다음 페이지로 가는 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-md disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
        aria-label="Next Page"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;