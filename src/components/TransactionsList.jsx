import React from "react";
import { useHistory } from "react-router-dom";

const TransactionList = ({
  transactions,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  const history = useHistory();

  const handleClick = (hash) => {
    history.push(`/details/${hash.slice(0, 20)}`);
  };

  return (
    <div>
      <h4>Transactions</h4>
      <ul className="unordered-list">
        {transactions.map((tx) => (
          <li key={tx.hash}>
            <button onClick={() => handleClick(tx.hash)}>{tx.hash}</button>
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TransactionList;
