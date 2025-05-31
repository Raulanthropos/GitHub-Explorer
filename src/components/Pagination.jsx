const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <nav className="mt-4 d-flex justify-content-center align-items-center gap-3">
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className="btn btn-outline-secondary"
      >
        Prev
      </button>
      <span className="mx-2">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="btn btn-outline-secondary"
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
