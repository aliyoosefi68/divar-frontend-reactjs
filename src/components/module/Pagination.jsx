import React, { useState } from "react";

//style
import styles from "./Pagination.module.css";
import Loader from "./Loader";
import { e2p } from "src/utils/numbers";

function Pagination({ currentPage, setCurrentPage, pagesNumbers }) {
  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };
  const nextHandler = () => {
    if (currentPage < pagesNumbers.length)
      setCurrentPage((currentPage) => currentPage + 1);
  };

  return (
    <div className={styles.pagination}>
      <button
        className={`${
          currentPage === pagesNumbers.length ? styles.inactive : null
        }`}
        onClick={nextHandler}
      >
        بعدی
      </button>
      <ul className={styles.pagination}>
        {pagesNumbers?.map((i) => (
          <li
            className={`${i + 1 === currentPage ? styles.active : null}`}
            key={i}
            onClick={() => {
              setCurrentPage(i + 1);
            }}
          >
            {e2p(i + 1)}
          </li>
        ))}
      </ul>
      <button
        className={`${currentPage === 1 ? styles.inactive : null}`}
        onClick={prevHandler}
      >
        قبلی
      </button>
    </div>
  );
}

export default Pagination;
