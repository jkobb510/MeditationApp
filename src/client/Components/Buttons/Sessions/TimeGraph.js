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
      <h4 style={{marginTop: 10}}>This Week's Progress</h4>
      <span style={{fontSize: 12, marginTop: 3, marginBottom: 20}}>({weekRange})</span>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default TimeGraph;