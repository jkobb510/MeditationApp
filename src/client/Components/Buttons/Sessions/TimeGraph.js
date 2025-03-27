import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import useLogs from "../../../hooks/useLogs";
import useTimeGraphData from "../../../hooks/useTimeGraphData.js";
import { getChartConfig } from "./ChartConfig";

const TimeGraph = ({username, onClose}) => {
  const { logs, loading } = useLogs(username);
  const { weekDates, dataPoints, weekRange } = useTimeGraphData(logs);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");
    const initialDataPoints = loading ? Array(weekDates.length).fill(0) : dataPoints;

    chartInstance.current = new Chart(ctx, getChartConfig(weekDates, initialDataPoints));

  }, [weekDates, dataPoints, loading]);

  return (
    <div className="graph">
      <button className="graph-close-button" onClick={onClose}>×</button>
      <h4 style={{ marginTop: 10 }}>This Week's Progress</h4>
      <span style={{ fontSize: 12, marginTop: 3, marginBottom: 20 }}>({weekRange})</span>
      <canvas ref={chartRef} />
    </div>
  );
};

export default TimeGraph;