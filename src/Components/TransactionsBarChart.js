import React, { useEffect, useRef } from 'react';
// import { Bar } from 'react-chartjs-2'; 
import Chart from 'chart.js/auto'; 

const TransactionsBarChart = ({ data }) => {
  const chartRef = useRef(null); // Reference to the chart canvas

  useEffect(() => {
    // Cleanup previous chart before rendering new chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Prepare data for the chart
    const chartData = {
      labels: data.map((d) => d.range), 
      datasets: [
        {
          label: 'Number of Items', 
          data: data.map((d) => d.count), 
          backgroundColor: 'rgba(75, 192, 192, 0.6)', 
        },
      ],
    };

    // Create a new Chart instance
    chartRef.current = new Chart(document.getElementById('bar-chart'), {
      type: 'bar', 
      data: chartData, 
    });
  }, [data]); // Re-run effect when the data changes

  return (
    <div>
      <h2>Bar Chart</h2>
      <canvas id="bar-chart"></canvas> {/* Canvas element to render the chart */}
    </div>
  );
};

export default TransactionsBarChart;
