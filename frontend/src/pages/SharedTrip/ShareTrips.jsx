import React from "react";
import { useState } from "react";
import { getSharedTrips } from "../../api/shareTrip";
import { useEffect } from "react";

const ShareTrips = () => {
  const [sharedTrips, setSharedTrips] = useState([]);
  const fetchSharedTrips = async () => {
    const response = await getSharedTrips();
    setSharedTrips(response.data);
  };

  useEffect(() => {
    fetchSharedTrips();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.2em] text-blue-700 ">
            Shared With You
          </p>
          <h1 className="text-4xl md:text-5xl text-blue-950 ">Shared Trips</h1>
          <p className="text-sm text-blue-800 ">
            Trips your friends and teammates have shared with you.
          </p>
        </div>

        {sharedTrips.length === 0 ? (
          <div className="mt-10 rounded-3xl border border-dashed border-blue-200 bg-white/80 p-10 text-center shadow-sm">
            <p className="text-blue-900 ">
              No shared trips found yet. Ask someone to share a trip with you.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {sharedTrips.map((item) => {
              const trip = item.trip;
              return (
                <div
                  key={item._id}
                  className="rounded-3xl bg-white border border-blue-100 shadow-xl shadow-blue-900/10 p-5 flex flex-col gap-4 transition hover:-translate-y-1 hover:border-blue-300"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-blue-700 ">
                        Shared Trip
                      </p>
                      <h2 className="text-xl text-blue-950 ">
                        {trip.tripName}
                      </h2>
                    </div>
                    <span className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-xs font-semibold ">
                      {trip.destination}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm text-blue-900">
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-blue-700">
                        Start
                      </p>
                      <p className="text-base text-blue-950 font-semibold">
                        {trip.startDate}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-blue-700">
                        End
                      </p>
                      <p className="text-base text-blue-950 font-semibold">
                        {trip.endDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-xs font-semibold ">
                      {trip.persons} People
                    </span>
                    <span className="rounded-full bg-blue-50 text-blue-800 px-3 py-1 text-xs font-semibold">
                      {trip.tripType || "Trip"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareTrips;
