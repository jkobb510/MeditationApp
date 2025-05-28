import { useMemo } from "react";
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);
const useTimeGraphData = (logs) => {
  return useMemo(() => {
    const today = dayjs().startOf("day");
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
    const formattedDate = dayjs.utc(date).local().format("M/D/YYYY");
    console.log({ formattedDate, isInRange: !!fullDateMap[formattedDate], durationSeconds });

      if (!fullDateMap[formattedDate]) return acc;

      if (!acc[formattedDate]) acc[formattedDate] = 0;

      acc[formattedDate] += durationSeconds;
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