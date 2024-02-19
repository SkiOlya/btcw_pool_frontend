import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


const PoolBloskChart = ({ startDate, endDate }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      // Предполагаем, что бекенд принимает даты в формате 'YYYY-MM-DD'
      const response = await fetch(`https://utxopool.com/api/poolmining/statistics?startDate=${startDate}&endDate=${endDate}`);
      const rawData = await response.json();
      const data = rawData.map(item => ({
        date: item[0],
        blocks: item[1],
      }));

      const labels = data.map(item => {
        const date = new Date(item.date);
        // Форматируем дату в формат, например, 'Feb 10'
        return date.toLocaleDateString(navigator.language, { month: 'short', day: 'numeric' });
      });
      const chartValues = data.map(item => item.blocks);

      setChartData({
        labels,
        datasets: [
          {
            label: 'Mined blocks',
            data: chartValues,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      });
    };

    fetchData();
  }, [startDate, endDate]);

  const options = {
    plugins: {
      legend: {
        display: false, // Скрывает легенду
      }
    },
    scales: {
      
      y: { // Для версий chart.js 3.x 'y' может быть 'yAxes' в версиях 2.x
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Можете настроить цвет линий сетки по оси Y аналогично
          drawBorder: false,
          drawOnChartArea: true,
          drawTicks: false,
        },
      }
    },
    maintainAspectRatio: false, // Позволяет диаграмме занимать всю высоту контейнера
  };
  return (
    <div style={{ height: '400px', width: '100%'}}> {/* Задаем высоту контейнера */}
      <Bar data={chartData} options={options} />
    </div>
  );

};

export default PoolBloskChart;
