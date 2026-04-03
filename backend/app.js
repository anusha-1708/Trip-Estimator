import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import tripRoutes from "./src/routes/trips.routes.js";
import shareRoutes from "./src/routes/sharedTrip.routes.js";
import userRoutes from "./src/routes/user.routes.js";
const app = express();
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/trips", tripRoutes);
app.use("/api/users", userRoutes);

app.use("/api/shared-trips", shareRoutes);
export default app;
