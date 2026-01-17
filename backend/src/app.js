import express from "express";
import cors from "cors";
import morgan from "morgan";
import { errorHandler } from "./middlewares/errorHandler.js";
import { MESSAGES } from "./constants/messages.js";
import productRoutes from "./routes/productRoutes.js";



const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Health check route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: MESSAGES.SERVER_RUNNING,
  });
});

app.use("/api", productRoutes);


// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: MESSAGES.NOT_FOUND,
  });
});

// Global error handler (must be last)
app.use(errorHandler);

export default app;
