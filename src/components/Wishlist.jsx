import React, { useEffect, useState } from 'react';
import { currencyFormat } from '../utils';
import { TrendingDown, TrendingUp } from '../heroicons.jsx/icons';
import { Link } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { isAuthenticated, logout } = useAuth0();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter((coin) => coin.id !== id);
    
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    setWishlist(updatedWishlist);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      clearWishlist();
    }
  }, [isAuthenticated]);

  const clearWishlist = () => {
    localStorage.removeItem('wishlist');
      setWishlist([]);
  };

  return (
    <section className='mt-7'>
      <div className='grid grid-cols-4 font-medium p-2 rounded text-red-500 border-red-400 border-b '>
        <div className='flex items-center gap-1 w-full'>
          <h1>Name</h1>
        </div>
        <span className='w-full text-center'>Price</span>
        <span className={'flex gap-1'}>24h</span>
        <div className='hidden sm:block'>
          <p className='font-semibold'>Market Cap</p>
        </div>
      </div>

      {wishlist.map((coin) => (
        <>
          <div className='justify-end flex'>
            <button onClick={() => handleRemoveFromWishlist(coin.id)} className='border-b border-red-500 text-red-500 rounded hover:bg-gray-200 '>
              Remove
            </button>
          </div>
          <Link key={coin.id} to={`/coin/${coin.id}`}>
            <div className='grid grid-cols-4 font-light p-2 rounded border-red-400 border-b hover:bg-gray-200'>
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
      ))}

      {wishlist.length === 0 && <h1>Wishlist Empty</h1>}

      {isAuthenticated && (
        <p>
        </p>
      )}
    </section>
  );
};

export default Wishlist;
