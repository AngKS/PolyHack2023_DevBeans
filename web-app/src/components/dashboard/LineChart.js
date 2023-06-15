import React from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { chartOptions } from "./options/ChartOptions";
const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 180);
        gradient.addColorStop(0, "#84ADFF");
        gradient.addColorStop(1, "rgba(132, 173, 255, 0)");
        return gradient;
      },
      borderColor: "rgb(0,0,255)",
      data: [0, 10, 5, 2, 20, 30, 45],
    },
  ],
};
const LineChart = () => {
  return (
    <div className="h-full w-auto">
      <Line data={data} options={chartOptions} />
    </div>
  );
};
export default LineChart;
