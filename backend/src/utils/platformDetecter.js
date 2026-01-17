export const detectPlatform = (url) => {
  if (url.includes("amazon")) return "amazon";
  if (url.includes("flipkart")) return "flipkart";
  return null;
};
