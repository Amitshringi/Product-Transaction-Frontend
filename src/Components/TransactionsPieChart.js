import React, { useEffect, useRef } from 'react';
// import { Pie } from 'react-chartjs-2'; 
import Chart from 'chart.js/auto'; 

const TransactionsPieChart = ({ data }) => {
  const chartRef = useRef(null); 

  useEffect(() => {
    // Cleanup previous chart before rendering new chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Prepare data for the chart
    const chartData = {
      labels: data.map((d) => d._id), // Labels for each segment of the pie chart
      datasets: [
        {
          label: 'Number of Items', // Dataset label
          data: data.map((d) => d.count), 
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
          ],
        },
      ],
    };

    // Create a new Chart instance
    chartRef.current = new Chart(document.getElementById('pie-chart'), {
      type: 'pie', 
      data: chartData, 
    });
  }, [data]); //

  return (
    <div>
      <h2>Pie Chart</h2>
      <canvas id="pie-chart"></canvas> {/* Canvas element to render the chart */}
    </div>
  );
};

export default TransactionsPieChart;
