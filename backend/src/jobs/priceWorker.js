import dotenv from "dotenv";
dotenv.config();
import { Worker } from "bullmq";
import { connection } from "../config/queue.js";
import { pool } from "../config/db.js";
import { scrapeAmazonProduct } from "../services/amazonScraper.js";

const worker = new Worker(
  "price-scrape-queue",
  async (job) => {
    const { productId, url, platform } = job.data;

    console.log(`🔄 Scraping product ${productId}`);

    let productData;

    if (platform === "amazon") {
      productData = await scrapeAmazonProduct(url);
    } else {
      throw new Error("Flipkart not implemented yet");
    }

    await pool.query(
      `INSERT INTO price_history (product_id, price, currency)
       VALUES ($1, $2, $3)`,
      [productId, productData.price, productData.currency]
    );

    console.log(`✅ Updated price for product ${productId}`);
  },
  { connection }
);

worker.on("failed", (job, err) => {
  console.error(`❌ Job failed for product ${job.data.productId}`, err);
});
