import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  pageChange,
}: PaginationProps) {
  return (
    <div className={styles.pagination}>
      <button
        onClick={() => pageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`${styles.button} ${styles.prevButton}`}
      >
        Previous
      </button>
      <div className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </div>
      <button
        onClick={() => pageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`${styles.button} ${styles.nextButton} `}
      >
        Next
      </button>
    </div>
  );
}
