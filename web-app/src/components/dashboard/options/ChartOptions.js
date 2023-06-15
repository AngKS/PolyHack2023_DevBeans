export const chartOptions = {
  responsive: true,
  animations: {
    tension: {
      duration: 500,
      easing: "linear",
      from: 0,
      to: 0.3,
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        display: false,
      },
      grid: {
        display: false,
      },
      border: {
        display: false,
      },
    },
  },
};
