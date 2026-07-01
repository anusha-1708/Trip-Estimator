import Navbar from "../../component/Navbar";
import { useState, useEffect } from "react";
import { getDashboardSummary } from "../../api/dashboard";
import BarChart from "../../component/Dashboard/Chart/BarChart";
import ListCard from "../../component/Dashboard/ListCard/ListCard";

const Dashboard = () => {
  const [data, setData] = useState({
    totalTrips: 0,
    totalAmount: 0,
    totalSharedTrips: 0,
    monthlyTrips: [],
    recentTrips: [],
    expensiveTrips: [],
    cheapTrips: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDashboardSummary();
      setData(res);
    };
    fetchData();
  }, []);
  const kpiCards = [
    { label: "Total Trips", value: `${data.totalTrips}` },
    { label: "Total Expenses", value: `${data.totalAmount}` },
    {
      label: "Trips Shared With Me",
      value: `${data.totalSharedTrips}`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className=" mx-auto flex flex-col gap-6 mt-6">
        <div className="grid gap-4 md:grid-cols-3">
          {kpiCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#1f2a44]/60 ">
                  {card.label}
                </p>
                <p className="text-2xl text-[#101828] font-['Fraunces'] mt-2">
                  {card.value}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/** Chart and Recent Trips Row */}
        <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
          <div className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-5 h-full">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#101828] font-['Fraunces']">
                Trip Activity
              </h2>
            </div>
            <div className="mt-4" style={{ height: "340px" }}>
              <BarChart data={data.monthlyTrips} />
            </div>
          </div>

          <ListCard
            title={"Recent Trips"}
            data={data.recentTrips}
            renderItem={(trip) => (
              <>
                <div>
                  <p className="text-sm font-semibold text-[#101828]">
                    {trip.tripName}
                  </p>
                  <p className="text-xs text-[#1f2a44]/60">
                    {trip.destination} · {trip.persons} People
                  </p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="text-sm font-semibold text-[#101828]">
                    ₹ {trip.totalCost}
                  </p>
                </div>
              </>
            )}
          />
        </div>
      </div>

      {/** Top Expensive and Cheapest Trips */}
      <div className="grid gap-6 md:grid-cols-2 my-4 ">
        <ListCard
          title={"Expensive Trips"}
          data={data.expensiveTrips}
          renderItem={(trip) => (
            <>
              <span className="text-sm text-[#101828]">{trip.tripName}</span>
              <span className="text-sm font-semibold text-[#101828] shrink-0">
                ₹ {trip.totalCost}
              </span>
            </>
          )}
        />
        <ListCard
          title={"Cheapest Trips"}
          data={data.cheapTrips}
          renderItem={(trip) => (
            <>
              <span className="text-sm text-[#101828]">{trip.tripName}</span>
              <span className="text-sm font-semibold text-[#101828] shrink-0">
                ₹ {trip.totalCost}
              </span>
            </>
          )}
        />
      </div>
    </div>
    // </div>
  );
};

export default Dashboard;
