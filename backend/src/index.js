import dotenv from "dotenv";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { startPriceScheduler } from "./jobs/priceScheduler.js";


dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  startPriceScheduler();


  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
