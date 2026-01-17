import { trackProductService } from "../services/productService.js";

export const trackProduct = async (req, res, next) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "URL is required",
      });
    }

    const result = await trackProductService(url);

    res.status(201).json({
      success: true,
      message: result.message,
      productId: result.productId,
    });
  } catch (error) {
    next(error);
  }
};
