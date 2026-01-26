import dotenv from "dotenv";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { connectRedis, disconnectRedis } from "./config/redis";
import { BackgroundJob } from "./jobs/statistics.job";
import app from "./app";

dotenv.config();

const PORT = process.env.PORT || 4000;
const backgroundJob = new BackgroundJob();

const startServer = async () => {
  try {
    await connectDatabase();
    await connectRedis();

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    backgroundJob.start();

    const gracefulShutdown = async (signal: string) => {
      console.log(`${signal} received. Shutting down...`);
      backgroundJob.stop();
      server.close(async () => {
        await disconnectDatabase();
        await disconnectRedis();
        process.exit(0);
      });

      setTimeout(() => {
        console.error("Forced shutdown after timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
