import { pool } from "../config/db.js";
import { detectPlatform } from "../utils/platformDetector.js";
import { scrapeAmazonProduct } from "./amazonScraper.js";


export const trackProductService = async (url) => {
  // 1) Detect platform
  const platform = detectPlatform(url);

  if (!platform) {
    throw new Error("Unsupported URL. Only Amazon and Flipkart allowed.");
  }

  // 2) Check if product already exists
  const existing = await pool.query(
    "SELECT id FROM products WHERE url = $1",
    [url]
  );

  if (existing.rowCount > 0) {
    return {
      message: "Product already being tracked",
      productId: existing.rows[0].id,
    };
  }

  let productData;

  if (platform === "amazon") {
    productData = await scrapeAmazonProduct(url);
  } else {
    throw new Error("Flipkart scraper not implemented yet");
  }

  // 4) Insert into products table
  const productResult = await pool.query(
    `INSERT INTO products 
      (platform, url, name, image_url, rating, description)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING id`,
    [
      platform,
      url,
      productData.name,
      productData.image_url,
      productData.rating,
      productData.description,
    ]
  );

  const productId = productResult.rows[0].id;

  // 5) Insert first price into price_history
  await pool.query(
    `INSERT INTO price_history 
      (product_id, price, currency)
     VALUES ($1, $2, $3)`,
    [productId, productData.price, productData.currency]
  );

  return {
    message: "Product tracking started",
    productId,
  };
};
