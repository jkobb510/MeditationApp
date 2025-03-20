export const getChartConfig = (weekDates, dataPoints) => {
  const maxYValue = Math.max(...dataPoints, 1); // Ensure at least 1 to prevent a jump

  return {
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
          fill: true,
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
          suggestedMax: maxYValue + 1, // Prevents visible jump
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
  };
};