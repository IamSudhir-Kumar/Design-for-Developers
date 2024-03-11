import React, { useState, useEffect } from 'react';
import { LinearScale, PointElement, Tooltip, Legend, TimeScale} from "chart.js"; 

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 
import { MimicMetrics } from '../../api/api-mimic';
import { Line } from 'react-chartjs-2';

const MetricsChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MimicMetrics.fetchMetrics({
          startTs: Date.now() - 86400000, // Fetch data for the last 24 hours
          endTs: Date.now(),
        });

        // Extract CPU usage data from the response
        const cpuUsageData = response.find((graph) => graph.name === 'CPU Usage');

        // Process CPU usage data for Chart.js
        const cpuUsageDataset = cpuUsageData.graphLines.find(
          (line) => line.name === 'Used'
        );
        const cpuUsageValues = cpuUsageDataset.values;

        const labels = cpuUsageValues.map((entry) => new Date(entry.timestamp).toLocaleTimeString());
        const data = cpuUsageValues.map((entry) => entry.value);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'CPU Usage (%)',
              data: data,
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>CPU Usage Chart</h2>
      <div>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default MetricsChart;
