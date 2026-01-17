import { MESSAGES } from "../constants/messages.js";

export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: MESSAGES.INTERNAL_ERROR,
  });
};
