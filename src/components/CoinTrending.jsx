import React from 'react'
import { Link } from 'react-router-dom';

const CoinTrending = ({coin}) => {
  console.log(coin);
    return (
    <Link to={`/coin/${coin.id}`}>
    <div className="font-light mb-2 p-2 border-gray-200 border-2 rounded hover:bg-gray-200">
        <div className='flex items-center gap-1'>
            <span className='font-semibold'>{coin.score+1}.</span>
            <img alt={coin.name} className="w-10" src={coin.small}/>
            <div className="flex-grow">
                <h2 className="text-gray-900 title-font font-medium">{coin.name}</h2>
                <p className="text-gray-500 text-sm">({coin.symbol})</p>
            </div>
            </div>
        </div>
    </Link>
  )
}

export default CoinTrending