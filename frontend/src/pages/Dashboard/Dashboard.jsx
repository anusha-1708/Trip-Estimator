import Navbar from "../../component/Navbar";

const Dashboard = () => {
  const kpiCards = [
    { label: "Total Trips", value: "128", delta: "+12.5%" },
    { label: "Total Expenses", value: "₹ 4.8L", delta: "+8.1%" },
    { label: "Trips Shared With Me", value: "24", delta: "+3.2%" },
  ];
  const tripTrends = [
    { month: "Jan", value: 12 },
    { month: "Feb", value: 16 },
    { month: "Mar", value: 10 },
    { month: "Apr", value: 22 },
    { month: "May", value: 18 },
    { month: "Jun", value: 26 },
    { month: "Jul", value: 30 },
    { month: "Aug", value: 24 },
    { month: "Sep", value: 20 },
    { month: "Oct", value: 14 },
    { month: "Nov", value: 18 },
    { month: "Dec", value: 28 },
  ];
  const recentTrips = [
    {
      name: "Maharashtra Road Trip",
      destination: "Matheran, Maharastra",
      people: 3,
      budget: "₹ 84,000",
    },
    {
      name: "Kerala Backwaters",
      destination: "Kerala, India",
      people: 5,
      budget: "₹ 32,500",
    },
    {
      name: "Jammu & Kashmir Escape",
      destination: "Kashmir, Jammu",
      people: 2,
      budget: "₹ 94,000",
    },
    {
      name: "Andaman Islands Gateway",
      destination: "Andaman, India",
      people: 4,
      budget: "₹ 1.3L",
    },
  ];
  const topExpensive = [
    { name: "Iceland Ring Road", amount: "₹ 3.2L" },
    { name: "Swiss Alps Retreat", amount: "₹ 2.7L" },
    { name: "Safari Adventure", amount: "₹ 2.3L" },
  ];
  const cheapestTrips = [
    { name: "Pondicherry Getaway", amount: "₹ 18,500" },
    { name: "Jaipur Weekend", amount: "₹ 22,900" },
    { name: "Coorg Trails", amount: "₹ 26,400" },
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
              <span className="text-xs font-semibold text-[#1f2a44] bg-[#e7edff] px-3 py-1 rounded-full">
                {card.delta}
              </span>
            </div>
          ))}
        </div>
        {/** Chart of Trips over a period  */}
        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg text-[#101828] font-['Fraunces']">
                  Trip Frequency
                </h2>
                <p className="text-xs text-[#1f2a44]/60 ">
                  Monthly trips count
                </p>
              </div>
              <div className="text-xs text-[#1f2a44]/80 bg-[#e7edff] px-3 py-1 rounded-full">
                Yearly View
              </div>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-2 items-end h-48">
              {tripTrends.map((item) => (
                <div
                  key={item.month}
                  className="flex flex-col items-center gap-2"
                >
                  <div
                    className="w-full rounded-md bg-[#4f46e5]"
                    style={{ height: `${item.value * 4}px` }}
                  />
                  <span className="text-[10px] text-black font-['Poppins']">
                    {item.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/** Recent Trips Table */}
          <div className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#101828] font-['Fraunces']">
                Recent Trips
              </h2>
              <span className="text-xs text-[#1f2a44]/60 ">View All</span>
            </div>
            <div className="mt-4 flex flex-col gap-3">
              {recentTrips.map((trip) => (
                <div
                  key={trip.name}
                  className="border border-[#1f2a44]/10 rounded-xl p-3 flex items-center justify-between"
                >
                  <div>
                    <p className="text-sm font-semibold text-[#101828]">
                      {trip.name}
                    </p>
                    <p className="text-xs text-[#1f2a44]/60">
                      {trip.destination} · {trip.people} People
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#101828]">
                      {trip.budget}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/** Top Expensive and Cheapest Trips */}
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-5">
            <h2 className="text-lg text-[#101828] font-['Fraunces']">
              Top Expensive Trips
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {topExpensive.map((trip) => (
                <div
                  key={trip.name}
                  className="flex items-center justify-between border border-[#1f2a44]/10 rounded-xl p-3"
                >
                  <span className="text-sm text-[#101828]">{trip.name}</span>
                  <span className="text-sm font-semibold text-[#101828]">
                    {trip.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-[#1f2a44]/10 shadow-sm p-5">
            <h2 className="text-lg text-[#101828] font-['Fraunces']">
              Cheapest Trips
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {cheapestTrips.map((trip) => (
                <div
                  key={trip.name}
                  className="flex items-center justify-between border border-[#1f2a44]/10 rounded-xl p-3"
                >
                  <span className="text-sm text-[#101828]">{trip.name}</span>
                  <span className="text-sm font-semibold text-[#101828]">
                    {trip.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
