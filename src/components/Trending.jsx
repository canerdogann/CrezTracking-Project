import React from 'react'
import useAxios from '../hooks/useAxios'
import CoinTrending from './CoinTrending';
import Skeleton from './Skeleton';

const Trending = () => {
  const { response, loading} = useAxios('search/trending');
  
  if(loading) {
    return (
      <div className='mt-8'>
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    )
  }

    return (
    
    <div className='mt-8 items-center justify-center text-center'>
        <div className="font-extrabold mb-2 p-2 border-red-500 border-2 rounded ">Trending</div>
        {response && response.coins.map(coin => <CoinTrending key={coin.item.coin_id} coin={coin.item} /> )}
    </div>
  )
}

export default Trending