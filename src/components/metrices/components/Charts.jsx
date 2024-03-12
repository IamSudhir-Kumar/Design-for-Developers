import React from 'react'
import { Line } from 'react-chartjs-2'
import { MimicMetrics } from '../../api/api-mimic'
const Charts = ({MimicMetrics}) => {
  return (
    <Line data={MimicMetrics} options={}/>
  )
}

export default Charts