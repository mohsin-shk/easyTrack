import dotenv from "dotenv";
import { Queue } from "bullmq";
import Redis from "ioredis";

dotenv.config();   // <-- VERY IMPORTANT

export const connection = new Redis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null,   // ✅ REQUIRED BY BULLMQ
});

export const priceQueue = new Queue("price-scrape-queue", {
  connection,
});
