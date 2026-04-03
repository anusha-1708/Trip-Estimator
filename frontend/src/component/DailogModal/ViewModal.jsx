import React from "react";
import { MdModeEdit, MdDelete } from "react-icons/md";
import {
  getFixedExpenses,
  calculatePerPerson,
} from "../../customHooks/Calculation";

const ViewModal = ({ trip, handleEdit, setModalMode }) => {
  const totalFixedExpense = getFixedExpenses(trip?.fixedExpense || "");
  const perPerson = calculatePerPerson(
    trip?.fixedExpense || "",
    trip?.persons || "",
  );

  const totalOtherExpense =
    trip?.otherExpense?.reduce(
      (sum, exp) => sum + Number(exp.otherExpenses || 0),
      0,
    ) || 0;

  const formatDate = (value) => {
    const date = new Date(value);
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-lg w-full bg-white rounded-xl shadow-2xl overflow-hidden">
      <div className="bg-slate-50 border-b p-6 text-center">
        <h2 className="text-xl font-bold text-slate-800">Trip Overview</h2>
        <p className="text-blue-600 font-medium">{trip?.tripName}</p>
      </div>

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div>
            <p className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              Destination
            </p>
            <p className="font-semibold text-slate-700">{trip?.destination}</p>
          </div>
          <div>
            <p className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              Group Size
            </p>
            <p className="font-semibold text-slate-700">
              {trip?.persons} People
            </p>
          </div>
          <div>
            <p className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              Start Date
            </p>
            <p className="font-semibold text-slate-700">
              {formatDate(trip?.startDate)}
            </p>
          </div>
          <div>
            <p className="text-slate-400 uppercase text-[10px] font-bold tracking-wider">
              End Date
            </p>
            <p className="font-semibold text-slate-700">
              {formatDate(trip?.endDate)}
            </p>
          </div>
        </div>

        <hr className="border-slate-100" />

        <div>
          <h3 className="text-sm font-bold text-slate-800 mb-3">
            Cost Breakdown
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm py-1 border-b border-dashed">
              <span className="text-slate-500">
                Fixed Expenses (Food, Stay, Travel)
              </span>
              <span className="font-bold text-slate-700">
                ₹{totalFixedExpense}
              </span>
            </div>
            <div className="flex justify-between text-sm py-1 border-b border-dashed">
              <span className="text-slate-500">Other Expenses</span>
              <span className="font-bold text-slate-700">
                ₹{totalOtherExpense}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-slate-800 font-bold text-lg">
                Total Cost
              </span>
              <span className="text-2xl font-black text-blue-600">
                ₹{Number(totalFixedExpense) + Number(totalOtherExpense)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex justify-between items-center">
          <span className="text-blue-800 text-sm font-semibold">
            Cost Per Person
          </span>
          <span className="text-blue-800 font-bold text-lg">₹{perPerson}</span>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => handleEdit(trip._id)}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-800 text-white py-2.5 rounded-lg font-medium hover:bg-slate-900 transition"
          >
            <MdModeEdit /> Edit
          </button>
          <button
            onClick={() => setModalMode("delete")}
            className="flex items-center justify-center w-12 h-10 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition"
          >
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
