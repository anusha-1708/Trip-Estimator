import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";

const PORT = 5000;

dotenv.config();
connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
