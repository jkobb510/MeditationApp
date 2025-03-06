// chartConfig.js
export const getChartConfig = (weekDates, dataPoints) => ({
  type: "line",
  data: {
    labels: weekDates,
    datasets: [
      {
        label: "Accumulated Session Time",
        data: dataPoints,
        borderColor: "#82ca9d",
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointBackgroundColor: "#82ca9d",
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: { display: true, text: "Time Spent (Minutes)" },
        beginAtZero: true,
        suggestedMax: Math.max(...dataPoints, 1),
        ticks: {
          stepSize: 1,
          callback: (value) => `${value}m`,
        },
      },
      x: { title: { display: true, text: "Date" } },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const totalSeconds = tooltipItem.raw * 60;
            return `${Math.floor(totalSeconds / 60)}m ${totalSeconds % 60}s`;
          },
        },
      },
    },
  },
});
