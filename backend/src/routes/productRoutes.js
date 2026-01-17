import express from "express";
import { trackProduct } from "../controllers/productController.js";

const router = express.Router();

router.post("/track", trackProduct);

export default router;
