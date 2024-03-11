import React from 'react';
import { MimicMetrics } from '../api/api-mimic';
import { Line } from 'react-chartjs-2';
import MetricsChart from './components/Charts';
const Metrics= () => {
  return (
    <div className="container mx-auto">
      <MetricsChart />
    </div>
  );
};

export default Metrics;
