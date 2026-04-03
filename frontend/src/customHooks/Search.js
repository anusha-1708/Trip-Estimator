import { useCallback } from "react";
import { useSelector } from "react-redux";
export const useSearchTrips = () => {
  const { searchQuery } = useSelector((state) => state.stepper);
  const searchTrips = useCallback(
    (trips) => {
      return trips.filter((trip) => {
        return (
          trip.tripName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trip.destination?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    },
    [searchQuery],
  );
  return { searchTrips };
};
