import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = (props) => {
  const data = {
    labels: ['Income', 'Production', 'Transport', 'Legal', 'Packaging'].filter((_, index) => [
      props.percentage.incomePercentage,
      props.percentage.productionPercentage,
      props.percentage.transportPercentage,
      props.percentage.legalPercentage,
      props.percentage.packagingPercentage
    ][index] > 0),
    datasets: [{
      data: [
        props.percentage.incomePercentage,
        props.percentage.productionPercentage,
        props.percentage.transportPercentage,
        props.percentage.legalPercentage,
        props.percentage.packagingPercentage
      ].filter(value => value > 0),
      backgroundColor: [
        '#0088FE',
        '#FF8042',
        '#FF4D4D',
        '#E4A11B',
        '#FB6944'
      ].slice(0, [
        props.percentage.incomePercentage,
        props.percentage.productionPercentage,
        props.percentage.transportPercentage,
        props.percentage.legalPercentage,
        props.percentage.packagingPercentage
      ].filter(value => value > 0).length),
      borderColor: [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff'
      ].slice(0, [
        props.percentage.incomePercentage,
        props.percentage.productionPercentage,
        props.percentage.transportPercentage,
        props.percentage.legalPercentage,
        props.percentage.packagingPercentage
      ].filter(value => value > 0).length),
      borderWidth: 2,
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Persentase Distribusi'
      }
    },
    cutout: '60%'
  };

  return (
    <div className='w-full bg-white rounded-xl'>
      <div className='max-w-sm mx-auto my-auto'>
        <Doughnut options={options} data={data} />
      </div>
    </div>
  );
};

export default DonutChart;