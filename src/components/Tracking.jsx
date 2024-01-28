import React, { useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import Coin from './Coin';
import Search from './Search';
import Skeleton from './Skeleton';
import { ArrowLeft, ArrowRight } from '../heroicons.jsx/icons';

const Market = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [coinsPerPage] = useState(10);
  const { response, loading } = useAxios(
    `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false&locale=en`
  );

  const [displayedCoins, setDisplayedCoins] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    if (response) {
      const indexOfLastCoin = currentPage * coinsPerPage;
      const indexOfFirstCoin = indexOfLastCoin - coinsPerPage;
      const currentCoins = response.slice(indexOfFirstCoin, indexOfLastCoin);

      setDisplayedCoins(currentCoins);
    }
  }, [response, currentPage, coinsPerPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const addToWishlist = (coin) => {
    setWishlist((prevWishlist) => [...prevWishlist, coin]);
  };

  if (loading) {
    return (
      <div className='mt-8'>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  return (
    <>
      <Search className='items-center' />
      <section className='mt-7 '>
        <div className='grid grid-cols-4 font-bold p-2 rounded text-red-500 border-red-400 border-b '>
          <div className='flex items-center gap-1 w-full'>
            <h1>Name</h1>
          </div>
          <span className='w-full text-center'>Price</span>
          <span className={'flex gap-1'} style={{ marginLeft: '15px'}}>24h</span>
          <div className='hidden sm:block'>
            <p>Market Cap</p>
          </div>
        </div>
        {displayedCoins.map((coin) => (
          <Coin
            key={coin.id}
            coin={coin}
            addToWishlist={() => addToWishlist(coin)}
          />
        ))}
      </section>
      <div style={{ marginBottom: '20px', marginTop: '15px' }} className='flex justify-center'>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          
        >
          <ArrowLeft />
        </button>
        <span className='mx-2 font-semibold'>Page {currentPage}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!response || response.length < coinsPerPage}
          
        >
          <ArrowRight />
        </button>
      </div>
    </>
  );
};

export default Market;
