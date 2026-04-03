// import { fetchAllTripsAsync } from "../store/store";
import { useSearchTrips } from "./Search";
import { calculatePerPerson } from "./Calculation";
import { useMemo } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const useFilterTrips = () => {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchAllTripsAsync());
  // }, [dispatch]);
  const { trips } = useSelector((state) => state.stepper);
  // const {
  //   trips,
  //   // selectedPrice, selectedSortValue
  // } = useSelector((state) => state.stepper);
  const { searchTrips } = useSearchTrips();
  const filteredTrips = useMemo(() => {
    let result = [...trips];

    result = searchTrips(result);
    // if (selectedPrice !== null) {
    //   result = result.filter((trip) => {
    //     const price = calculatePerPerson(trip.fixedExpense, trip.persons);
    //     return price <= selectedPrice;
    //   });
    // }
    // switch (selectedSortValue) {
    //   case "low":
    //     result.sort(
    //       (a, b) =>
    //         calculatePerPerson(a.fixedExpense, a.persons) -
    //         calculatePerPerson(b.fixedExpense, b.persons),
    //     );
    //     break;
    //   case "high":
    //     result.sort(
    //       (a, b) =>
    //         calculatePerPerson(b.fixedExpense, b.persons) -
    //         calculatePerPerson(a.fixedExpense, a.persons),
    //     );
    //     break;
    //   case "ascending":
    //     result.sort(
    //       (a, b) =>
    //         a.tripName.localeCompare(b.tripName) -
    //         b.tripName.localeCompare(a.tripName),
    //     );
    //     break;
    //   case "descending":
    //     result.sort(
    //       (a, b) =>
    //         b.tripName.localeCompare(a.tripName) -
    //         a.tripName.localeCompare(b.tripName),
    //     );
    //     break;
    //   default:
    //     result.sort(
    //       (a, b) =>
    //         calculatePerPerson(a.fixedExpense, a.persons) -
    //         calculatePerPerson(b.fixedExpense, b.persons),
    //     );
    // }
    return result;
  }, [
    trips,
    // selectedPrice,
    searchTrips,
    // calculatePerPerson,
  ]);
  return { filteredTrips };
};
