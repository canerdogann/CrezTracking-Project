import React, { useState, useEffect, useRef } from 'react';
import useAxios from '../hooks/useAxios';
import Coin from './Coin';
import Skeleton from './Skeleton';
import axios from 'axios';
import { SearhLogo } from '../heroicons.jsx/icons';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { loading } = useAxios(
    `coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`
  );

  const searchContainerRef = useRef(null);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
    } else {
      fetchData();
    }
  }, [searchTerm]);

  const fetchData = async () => {
    try {
      const result = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${searchTerm}`
      );
      setSearchResults(result.data.coins || []);
    } catch (error) {
      console.error('Error fetching search results', error);
    }
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOutsideClick = (event) => {
    if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
      setSearchTerm(''); 
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  if (loading) {
    return (
      <div className='mt-8'>
        <Skeleton className='h-8 w-32' />
        <Skeleton className='h-8 w-full mt-2' />
        <Skeleton className='h-8 w-full mt-2' />
        <Skeleton className='h-8 w-full mt-2' />
        <Skeleton className='h-8 w-full mt-2' />
      </div>
    );
  }

  return (
    <section className='mt-7' ref={searchContainerRef}>
      <div className='flex justify-center items-center'>
        <div className='w-full max-w-md mb-4 p-4 border border-red-500 rounded flex'>
          <input
            type='text'
            placeholder='Search Coins...'
            onChange={handleSearchTermChange}
            className='p-2 border border-red-400  w-full placeholder:text-black'
          />
          <button type='button' className='ml-2'>
            <SearhLogo />
          </button>
        </div>
      </div>

      {searchResults.length > 0 ? (
        searchResults.map((coin) => <Coin key={coin.id} coin={coin}  />)
      ) : (
        <p></p>
      )}
    </section>
  );
};

export default Search;
