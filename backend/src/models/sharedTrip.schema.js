import mongoose from "mongoose";

const sharedTripSchema = new mongoose.Schema(
  {
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        role: {
          type: String,
          enum: ["member"],
          default: "member",
        },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("SharedTrip", sharedTripSchema);
