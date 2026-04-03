import { useSelector } from "react-redux";
import { useMemo } from "react";
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const useMonthlyTripsChart = () => {
  const trips = useSelector((state) => state.stepper.trips);

  const data = useMemo(() => {
    const monthlyCounts = Array(12).fill(0);
    trips.forEach((trip) => {
      const monthIndex = new Date(trip.startDate).getMonth();
      monthlyCounts[monthIndex] += 1;
    });
    return {
      label: MONTHS,
      values: monthlyCounts,
    };
  }, [trips]);

  return data;
};
