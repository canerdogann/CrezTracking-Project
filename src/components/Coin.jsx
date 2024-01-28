import React from 'react';
import { currencyFormat } from '../utils';
import { TrendingDown, TrendingUp } from '../heroicons.jsx/icons';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Coin = ({ coin }) => {
  const { isAuthenticated } = useAuth0();

  const handleAddToWishlist = () => {
    const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    
    const isCoinInWishlist = existingWishlist.some((item) => item.id === coin.id);

    if (isAuthenticated) {
      if (isCoinInWishlist) {
        alert('Coin is already in the wishlist!');
      } else {
        const updatedWishlist = [...existingWishlist, coin];
      
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        alert('Coin added to wishlist!');
      }
    } else {
      alert('You need to be logged in to add to wishlist.');
    }
  };

  return (
    <>
      {isAuthenticated && (
        <div className='justify-end flex'>
          <button className='border-b border-red-500 text-red-500 rounded hover:bg-gray-200 ' onClick={handleAddToWishlist}>
            Add to Wishlist
          </button>
        </div>
      )}
      
      <Link to={`/coin/${coin.id}`}>
        <div className='grid grid-cols-3 sm:grid-cols-4 font-light p-2 rounded border-red-400 border-b hover:bg-gray-200'>
          <div className='flex items-center gap-1 w-full'>
            <img
              className='w-6'
              src={coin.image ? coin.image : coin.large}
              alt={coin.name}
            />
            <p>{coin.name}</p>
            <span className='text-gray-500 text-xs'>({coin.symbol})</span>
          </div>
          <span className='w-full text-center'>
            {coin.current_price
              ? currencyFormat(coin.current_price)
              : 'N/A'}
          </span>
          <span
            className={`flex gap-1 ${
              coin.price_change_percentage_24h < 0
                ? 'text-red-500'
                : 'text-green-500'
            }`}
          >
            {coin.price_change_percentage_24h < 0 ? (
              <TrendingDown />
            ) : (
              <TrendingUp />
            )}
            {coin.price_change_percentage_24h}
          </span>

          <div className='hidden sm:block'>
            <span className='w-full text-center'>
              {coin.market_cap
                ? currencyFormat(coin.market_cap)
                : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Coin;
