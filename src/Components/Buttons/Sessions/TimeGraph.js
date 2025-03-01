import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import useLogs from "../../../hooks/useLogs";
import dayjs from "dayjs";

const TimeGraph = () => {
  const { logs } = useLogs();
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const today = dayjs();
  const startOfWeek = today.startOf("week");
  const endOfWeek = startOfWeek.add(6, "day");
  const weekRange = `${startOfWeek.format("M/D/YYYY")} - ${endOfWeek.format("M/D/YYYY")}`;

  const weekDates = [];
  const fullDateMap = {};
  for (let i = 0; i < 7; i++) {
    const fullDate = startOfWeek.add(i, "day").format("M/D/YYYY");
    const shortDate = startOfWeek.add(i, "day").format("M/D");
    weekDates.push(shortDate);
    fullDateMap[fullDate] = shortDate;
  }

  const timeByDate = logs.reduce((acc, log) => {
    const { date, timeRecorded } = log;

    if (!fullDateMap[date]) return acc;

    if (!acc[date]) acc[date] = { totalSeconds: 0, displayFormat: "0m 0s" };

    const timeParts = timeRecorded.match(/(\d+)m\s*(\d*)s?/);
    if (timeParts) {
      const minutes = parseInt(timeParts[1], 10) || 0;
      const seconds = parseInt(timeParts[2] || "0", 10);
      const totalSeconds = minutes * 60 + seconds;

      acc[date].totalSeconds += totalSeconds;
      const newMinutes = Math.floor(acc[date].totalSeconds / 60);
      const newSeconds = acc[date].totalSeconds % 60;
      acc[date].displayFormat = `${newMinutes}m ${newSeconds}s`;
    }

    return acc;
  }, {});


  const labels = weekDates;
  const dataPoints = labels.map(shortDate => {
    const fullDate = Object.keys(fullDateMap).find(date => fullDateMap[date] === shortDate);
    return (timeByDate[fullDate]?.totalSeconds || 0) / 60; // Convert to minutes
  });

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy(); // Destroy previous chart instance
    }

    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels, // X-axis labels are now "M/D"
        datasets: [
          {
            label: "Accumulated Session Time",
            data: dataPoints, // Values in minutes
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
            title: {
              display: true,
              text: "Time Spent (Minutes)",
            },
            beginAtZero: true,
            suggestedMax: Math.ceil(Math.max(...dataPoints)),
            ticks: {
              stepSize: 1,
              callback: function (value) {
                return `${value}m`;
              },
            },
          },
          x: {
            title: {
              display: true,
              text: "Date",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const totalSeconds = tooltipItem.raw * 60; // Convert back to total seconds
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                return `${minutes}m ${seconds}s`; // Show full time in tooltip
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [logs]);

  return (
    <div className="graph">
      <h5>Your Records This Week</h5>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TimeGraph;