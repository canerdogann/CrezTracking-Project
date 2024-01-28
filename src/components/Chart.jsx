import React from 'react'
import useAxios from '../hooks/useAxios'
import { useParams } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import moment from "moment";
  import Skeleton from "./Skeleton";
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );
  
  
  const Chart = () => {
    const { id } = useParams();
    const { response } = useAxios(`coins/${id}/market_chart?vs_currency=usd&days=7`);
    
    if(!response) {
      return (
        <div className="wrapper-container mt-8">
          <Skeleton className="h-72 w-full mb-10" />
        </div>
      )
    }
    const coinChartData = response.prices.map(value => ({ x: value[0], y: value[1].toFixed(2) }));
    
    const options = {
      responsive: true
    }
    const data = {
      labels: coinChartData.map(value => moment(value.x).format('MMM DD')),
      datasets: [
        {
          fill: true,
          label: id,
          data: coinChartData.map(val => val.y),
          borderColor: 'rgb(223, 87, 89)',
          backgroundColor: 'rgba(223, 87, 89, 0.5)',
        }
      ]
    }
  
    return (
      <div>
        <Line options={options} data={data} />
      </div>
    )
  }
  

export default Chart