import React from 'react';

const Pagination = ({ coinsPerPage, totalCoins, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalCoins / coinsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className='pagination'>
      {pageNumbers.map(number => (
        <li key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
          {number}
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
