import React from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import Skeleton from "./Skeleton";

const CoinAbout = () => {
  const { id } = useParams();
  const { response } = useAxios(
    `coins/${id}?localization=false&tickers=false&market_data=false&community_data=false&sparkline=false`
  );

  if (!response) {
    return (
      <div className="mt-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-full mt-2" />
      </div>
    );
  }

  return (
    <div className="my-6 text-center border border-red-400 p-4">
      <div className="flex flex-col items-center gap-2">
        <img
          src={response.image.small}
          alt={response.name}
          className="w-16 h-16"
        />
        <h1 className="text-2xl mb-2 capitalize font-bold text-red-400">
          {response.name}
        </h1>
      </div>
      <p
        className="mt-6 text-gray-500"
        dangerouslySetInnerHTML={{ __html: response.description.en }}
      ></p>
    </div>
  );
};

export default CoinAbout;
