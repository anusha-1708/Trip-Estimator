import TripSchema from "../models/trips.schema.js";
import SharedTrip from "../models/sharedTrip.schema.js";
import puppeteer from "puppeteer";
import { generateHtml } from "../common/pdfhtml.js";

export const createTripService = async (data, userId) => {
  const newTrip = await TripSchema.create({
    ...data,
    created_by: userId,
  });
  return newTrip;
};

export const getTripsByUserService = async (userId) => {
  const trips = await TripSchema.find({
    created_by: userId,
    deleted_at: null,
  }).sort({
    createdAt: -1,
  });
  return trips;
};

export const getTripByIDService = async (tripId, userId) => {
  const trip = await TripSchema.findOne({
    _id: tripId,
    created_by: userId,
    deleted_at: null,
  });
  if (!trip) {
    throw new Error("Trip not found!");
  }
  return trip;
};

export const updateTripService = async (tripId, data, userId) => {
  const updatedtrip = await TripSchema.findOneAndUpdate(
    {
      _id: tripId,
      created_by: userId,
      deleted_at: null,
    },
    data,
    {
      new: true,
    },
  );
  if (!updatedtrip) {
    throw new Error("Trip not found!");
  }
  return updatedtrip;
};

export const deletedTripService = async (tripId, userId) => {
  const removetrip = await TripSchema.findOneAndDelete(
    {
      _id: tripId,
      created_by: userId,
      deleted_at: null,
    },
    {
      deleted_at: new Date(),
      isActive: false,
    },
    { new: true },
  );
  if (!removetrip) {
    throw new Error("Trip not found!");
  }
  return removetrip;
};

export const generateTripSummaryPDF = async (tripId) => {
  const trip = await TripSchema.findById(tripId).populate(
    "created_by",
    "fullName email",
  );

  console.log("created_by", trip.created_by.fullname);

  if (!trip) {
    throw new Error("Trip not found");
  }
  const html = generateHtml(trip);

  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await page.setContent(html);

  const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });

  await browser.close();

  return pdfBuffer;
};
