import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({
  percentage = {
    incomePercentage: 0,
    productionPercentage: 0,
    transportPercentage: 0,
    legalPercentage: 0,
    packagingPercentage: 0
  }
}) => {
  if (!percentage) return null;

  const categories = ['Income', 'Production', 'Transport', 'Legal', 'Packaging'];
  const values = [
    percentage.incomePercentage,
    percentage.productionPercentage,
    percentage.transportPercentage,
    percentage.legalPercentage,
    percentage.packagingPercentage
  ];
  const colors = ['#0088FE', '#FF8042', '#FF4D4D', '#E4A11B', '#FB6944'];

  const filteredData = values.map((value, index) => ({
    label: categories[index],
    value,
    color: colors[index]
  })).filter(item => item.value > 0);

  const data = {
    labels: filteredData.map(item => item.label),
    datasets: [{
      data: filteredData.map(item => item.value),
      backgroundColor: filteredData.map(item => item.color),
      borderColor: filteredData.map(() => '#ffffff'),
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
        text: 'Persentase Distribusi',
      }
    },
    cutout: '60%'
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-md p-4">
      <div className="max-w-sm mx-auto">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
