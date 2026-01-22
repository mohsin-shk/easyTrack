export const detectPlatform = (url) => {
  if (url.includes("amzn")) return "amazon";
  if (url.includes("flipkart")) return "flipkart";
  return null;
};
