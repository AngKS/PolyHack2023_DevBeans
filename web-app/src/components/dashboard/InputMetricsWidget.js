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
const InputMetricsWidget = ({ recommended_phrases_used, total_count }) => {
  return (
    <div className="h-full w-auto flex justify-center items-center">
      <span className="text-7xl font-bold text-blue-500">
        {recommended_phrases_used}%
      </span>
      <span className="text-sm ml-2 font-medium text-slate-500">
        more empathetic in the past week.
      </span>
    </div>
  );
};
export default InputMetricsWidget;
