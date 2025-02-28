import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import useLogs from "./useLogs";

const TimeGraph = () => {
  const { logs } = useLogs();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Aggregate total session time per day
  const timeByDate = logs.reduce((acc, log) => {
    const { date, timeRecorded } = log;

    // Convert timeRecorded to total seconds
    const timeParts = timeRecorded.split(":").map(Number);
    let totalSeconds = timeParts.length === 3
      ? timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2] 
      : timeParts[0] * 60 + timeParts[1];

    acc[date] = (acc[date] || 0) + totalSeconds;
    return acc;
  }, {});

  // Convert to Chart.js-friendly format
  const labels = Object.keys(timeByDate);
  const dataPoints = labels.map(date => (timeByDate[date] / 3600).toFixed(2)); // Convert seconds to hours

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy the previous chart instance
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Accumulated Session Time (Hours)",
            data: dataPoints,
            borderColor: "#82ca9d",
            borderWidth: 2,
            tension: 0.3, // Smooth curve
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
            title: {
              display: true,
              text: "Hours",
            },
            beginAtZero: true,
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy(); // Cleanup on unmount
      }
    };
  }, [logs]); // Re-run effect when logs change

  return (
    <div style={{ width: "100%", height: 300 }}>
      <h3>Accumulated Session Time Per Day</h3>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TimeGraph;