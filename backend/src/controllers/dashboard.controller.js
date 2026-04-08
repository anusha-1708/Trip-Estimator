import mongoose from "mongoose";
import Trip from "../models/trips.schema.js";
import SharedTrip from "../models/sharedTrip.schema.js";

export const getDashboardSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.id);
    const currentYear = new Date().getFullYear();

    const start = new Date(`${currentYear}-01-01`);
    const end = new Date(`${currentYear + 1}-01-01`);

    const totalTrips = await Trip.countDocuments({
      created_by: userId,
      deleted_at: null,
      createdAt: { $gte: start, $lt: end },
    });

    const totalSharedTrips = await SharedTrip.countDocuments({
      "participants.user": userId,
    });

    const trips = await Trip.find({
      created_by: userId,
      deleted_at: null,
      createdAt: { $gte: start, $lt: end },
    });

    let totalAmount = 0;

    trips.forEach((trip) => {
      const fixed =
        (trip.fixedExpense?.foodExpense || 0) +
        (trip.fixedExpense?.travelExpense || 0) +
        (trip.fixedExpense?.stayExpense || 0);

      const other = (trip.otherExpense || []).reduce(
        (sum, item) => sum + (item.otherExpenses || 0),
        0,
      );

      totalAmount += fixed + other;
    });

    const monthlyTrips = await Trip.aggregate([
      {
        $match: {
          created_by: userId,
          deleted_at: null,
          createdAt: { $gte: start, $lt: end },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    const monthlyData = Array(12).fill(0);

    monthlyTrips.forEach((item) => {
      monthlyData[item._id - 1] = item.count;
    });

    const recentTripsData = await Trip.find({
      created_by: userId,
      deleted_at: null,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentTrips = recentTripsData.map((trip) => {
      const fixed =
        (trip.fixedExpense?.foodExpense || 0) +
        (trip.fixedExpense?.travelExpense || 0) +
        (trip.fixedExpense?.stayExpense || 0);

      const other = (trip.otherExpense || []).reduce(
        (sum, item) => sum + (item.otherExpenses || 0),
        0,
      );
      const totalCost = fixed + other;
      return { ...trip._doc, totalCost };
    });

    const expensiveTrips = trips
      .map((trip) => {
        const fixed =
          (trip.fixedExpense?.foodExpense || 0) +
          (trip.fixedExpense?.travelExpense || 0) +
          (trip.fixedExpense?.stayExpense || 0);

        const other = (trip.otherExpense || []).reduce(
          (sum, item) => sum + (item.otherExpenses || 0),
          0,
        );
        const totalCost = fixed + other;
        return { ...trip._doc, totalCost };
      })
      .sort((a, b) => b.totalCost - a.totalCost)
      .slice(0, 3);

    const cheapTrips = trips
      .map((trip) => {
        const fixed =
          (trip.fixedExpense?.foodExpense || 0) +
          (trip.fixedExpense?.travelExpense || 0) +
          (trip.fixedExpense?.stayExpense || 0);

        const other = (trip.otherExpense || []).reduce(
          (sum, item) => sum + (item.otherExpenses || 0),
          0,
        );
        const totalCost = fixed + other;
        return { ...trip._doc, totalCost };
      })
      .sort((a, b) => a.totalCost - b.totalCost)
      .slice(0, 3);

    res.status(200).json({
      success: true,
      data: {
        totalTrips,
        totalSharedTrips,
        totalAmount,
        monthlyTrips: monthlyData,
        recentTrips,
        expensiveTrips,
        cheapTrips,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
