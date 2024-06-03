import React from "react";
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Line } from "recharts";

interface ChartProps {
  data: any[]; // Data for the chart
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dateRep" />
      <YAxis allowDataOverflow={true} />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="cases" stroke="#8884d8" />
      <Line type="monotone" dataKey="deaths" stroke="#82ca9d" />
    </LineChart>
  );
};

export default Chart;
