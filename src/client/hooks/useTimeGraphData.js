import { useMemo } from "react";
import dayjs from "dayjs";

const useTimeGraphData = (logs) => {
  return useMemo(() => {
    const today = dayjs();
    const startOfWeek = today.startOf("week");
    const endOfWeek = startOfWeek.add(6, "day");

    const weekDates = [];
    const fullDateMap = {};

    for (let i = 0; i < 7; i++) {
      const fullDate = startOfWeek.add(i, "day").format("M/D/YYYY");
      const shortDate = startOfWeek.add(i, "day").format("M/D");
      weekDates.push(shortDate);
      fullDateMap[fullDate] = shortDate;
    }

    const timeByDate = logs.reduce((acc, { date, durationSeconds }) => {
      if (!fullDateMap[date]) return acc;

      if (!acc[date]) acc[date] = 0;

      acc[date] += durationSeconds;
      return acc;
    }, {});

    const dataPoints = weekDates.map((shortDate) => {
      const fullDate = Object.keys(fullDateMap).find(
        (date) => fullDateMap[date] === shortDate
      );
      return (timeByDate[fullDate] || 0) / 60; // Convert to minutes
    });

    return {
      weekDates,
      dataPoints,
      weekRange: `${startOfWeek.format("M/D/YYYY")} - ${endOfWeek.format("M/D/YYYY")}`,
    };
  }, [logs]);
};

export default useTimeGraphData;