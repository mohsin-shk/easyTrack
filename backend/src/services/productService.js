import { pool } from "../config/db.js";
import { detectPlatform } from "../utils/platformDetector.js";

// TEMPORARY MOCK SCRAPER (we will replace this later)
const mockScrapeProduct = async (url, platform) => {
  return {
    name: "Mock Product (Replace later)",
    image_url: "https://example.com/mock.jpg",
    rating: 4.2,
    price: 45999,
    currency: "INR",
  };
};

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

  // 3) Scrape product data (mock for now)
  const productData = await mockScrapeProduct(url, platform);

  // 4) Insert into products table
  const productResult = await pool.query(
    `INSERT INTO products 
      (platform, url, name, image_url, rating)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id`,
    [
      platform,
      url,
      productData.name,
      productData.image_url,
      productData.rating,
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
