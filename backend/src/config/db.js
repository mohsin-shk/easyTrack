import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Required for Neon
  },
});

const connectDB = async () => {
  try {
    await pool.query("SELECT 1");
    console.log("✅ Connected to Neon PostgreSQL successfully");
  } catch (error) {
    console.error("❌ Neon PostgreSQL Connection Failed:", error);
    process.exit(1);
  }
};

export { pool, connectDB };
