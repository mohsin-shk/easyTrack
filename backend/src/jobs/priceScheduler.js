import cron from "node-cron";
import { pool } from "../config/db.js";
import { priceQueue } from "../config/queue.js";

export const startPriceScheduler = () => {
  // "0 */6 * * *"
  cron.schedule("*/1 * * * *", async () => {
    console.log("⏰ Running price scheduler...");

    const result = await pool.query(
      "SELECT id, url, platform FROM products"
    );

    for (const product of result.rows) {
      await priceQueue.add("scrape-price", {
        productId: product.id,
        url: product.url,
        platform: product.platform,
      });
    }

    console.log(`📤 Added ${result.rowCount} jobs to queue`);
  });
};
