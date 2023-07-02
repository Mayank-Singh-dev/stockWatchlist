
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChart = ({ stockData }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && stockData && stockData['Time Series (60min)']) {
      const ctx = chartRef.current.getContext('2d');

      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const timeSeriesKeys = Object.keys(stockData['Time Series (60min)']).slice(0, 8);

      const labels = timeSeriesKeys.map(key => {
        const date = new Date(key);
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const time = key.split(' ')[1].slice(0, 5); 
        return `${day}-${month} ${time}`;
      });

      const data = timeSeriesKeys.map(key => parseFloat(stockData['Time Series (60min)'][key]['2. high']));

      
      const newChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: '',
              data: data,
              fill: false,
              borderColor: '#800080',
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          elements: {
            line: {
              borderWidth: 3,
              backgroundColor: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1))',
              shadowColor: 'rgba(255, 255, 255, 0.5)',
              shadowBlur: 10
            },
            point: {
              radius: 0
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
              display: false 
            },
            tooltip: {
              enabled: true,
              mode: 'index',
              intersect: false
            }
          }
        }
      });

      chartRef.current.chart = newChart;
    }
  }, [stockData]);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineChart;


