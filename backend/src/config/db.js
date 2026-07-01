import mongoose from "mongoose";

export const connectDB = async () => {
  try {
 
    const url = await mongoose.connect(process.env.MONGO_URI );
    console.log(`MongoDB  is connected: ${url.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    process.exit(1);
  }
};
