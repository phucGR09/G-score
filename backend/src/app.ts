// Load environment variables
import dotenv from "dotenv";
dotenv.config();
import express, { Application, Request, Response } from "express";
import cors from "cors";

const app: Application = express();

// Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

// Import Routes
import scoreRouter from "./routes/score.routes";
import { statisticsRouter, topStudentsRouter, countScoresRouter } from "./routes/statistics.routes";

// Import Middlewares
import { errorHandler, notFoundHandler } from "./middlewares/error.middleware";

// Routes Declaration
app.use("/api/v1/scores", scoreRouter);
app.use("/api/v1/statistics", statisticsRouter);
app.use("/api/v1/top-students", topStudentsRouter);
app.use("/api/v1/count-scores", countScoresRouter);

// Error handling - must be last
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
