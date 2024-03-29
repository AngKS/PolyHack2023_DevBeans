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
const CensoredDataWidget = () => {
  return (
    <div className="h-full w-auto">
      <Doughnut
        data={data}
        options={{
          ...chartOptions,
          responsive: true,
          labels: false,
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
        }}
      />
    </div>
  );
};
export default CensoredDataWidget;
