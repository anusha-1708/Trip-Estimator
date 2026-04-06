import { useSearchTrips } from "./Search";
import { calculatePerPerson } from "./Calculation";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useFilterTrips = () => {
  const { trips, selectedPrice, selectedSortValue } = useSelector(
    (state) => state.stepper,
  );
  const { searchTrips } = useSearchTrips();
  const filteredTrips = useMemo(() => {
    let result = [...trips];

    result = searchTrips(result);
    if (selectedPrice !== null) {
      result = result.filter((trip) => {
        const price = calculatePerPerson(
          trip.fixedExpense || {},
          trip.persons || 1,
        );
        return price <= selectedPrice;
      });
    }
    switch (selectedSortValue) {
      case "low":
        result.sort(
          (a, b) =>
            calculatePerPerson(a.fixedExpense || {}, a.persons || 1) -
            calculatePerPerson(b.fixedExpense || {}, b.persons || 1),
        );
        break;
      case "high":
        result.sort(
          (a, b) =>
            calculatePerPerson(b.fixedExpense || {}, b.persons || 1) -
            calculatePerPerson(a.fixedExpense || {}, a.persons || 1),
        );
        break;
      case "ascending":
        result.sort((a, b) => a.tripName.localeCompare(b.tripName));
        break;
      case "descending":
        result.sort((a, b) => b.tripName.localeCompare(a.tripName));
        break;
      default:
        result.sort(
          (a, b) =>
            calculatePerPerson(a.fixedExpense, a.persons) -
            calculatePerPerson(b.fixedExpense, b.persons),
        );
    }
    return result;
  }, [trips, selectedPrice, selectedSortValue, searchTrips]);
  return { filteredTrips };
};
