import React from "react";
import { Doughnut } from "react-chartjs-2";
import { chartOptions } from "./options/ChartOptions";
const labels = ["January", "February", "March", "April", "May", "June"];
const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      label: "My First Dataset",
      data: [300, 50, 100],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
      hoverOffset: 4,
    },
  ],
};
const CensoredDataWidget = ({ censored_content_count, total_count }) => {
  return (
    <div className="h-full w-auto flex justify-end items-end">
        <span className="text-7xl font-bold text-sky-700">{censored_content_count}%</span>
        <span className="text-sm ml-2 font-medium text-slate-500">contents censored.</span>
    </div>
  );
};
export default CensoredDataWidget;
