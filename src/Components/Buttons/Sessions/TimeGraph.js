import React, { useRef } from "react";
import Chart from "chart.js/auto";
import useLogs from "../../../hooks/useLogs";
import useTimeGraphData from "../../../hooks/useTimeGraphData";
import { getChartConfig } from "./ChartConfig";

const TimeGraph = () => {
  const { logs } = useLogs();
  const { weekDates, dataPoints, weekRange } = useTimeGraphData(logs);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  if (!chartInstance.current && chartRef.current) {
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, getChartConfig(weekDates, dataPoints));
  }

  if (chartInstance.current) {
    chartInstance.current.data.labels = weekDates;
    chartInstance.current.data.datasets[0].data = dataPoints;
    chartInstance.current.update();
  }

  return (
    <div className="graph">
      <h5 style={{marginTop: 20, marginBottom: 20}}>Your Records This Week ({weekRange})</h5>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TimeGraph;