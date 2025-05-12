import { useEffect, useRef } from "react";
import React from "react";
import "../styles/pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange, isModalOpen }) => {
  const paginationRef = useRef();

  useEffect(() => {
    if (!paginationRef.current) return;

    if (isModalOpen) {
      paginationRef.current.setAttribute("inert", "true");
      paginationRef.current.setAttribute("aria-hidden", "true");
    } else {
      paginationRef.current.removeAttribute("inert");
      paginationRef.current.removeAttribute("aria-hidden");
    }
  }, [isModalOpen]);

  const pageRange = 3;

  const generatePageNumbers = () => {
    const start = Math.max(1, currentPage - pageRange);
    const end = Math.min(totalPages, currentPage + pageRange);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="pagination" ref={paginationRef}>
      <button
        className="page-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Página anterior"
        tabIndex={isModalOpen ? -1 : 0}
      >
        ◀
      </button>

      {generatePageNumbers().map((page) => (
        <button
          key={page}
          className={`page-button ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
          aria-label={`Ir a la página ${page}`}
          tabIndex={-1}
        >
          {page}
        </button>
      ))}

      <button
        className="page-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Página siguiente"
        tabIndex={isModalOpen ? -1 : 0}
      >
        ▶
      </button>
    </div>
  );
};

export default Pagination;
