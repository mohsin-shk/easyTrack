import puppeteer from "puppeteer";

const getRandomUserAgent = () => {
  const agents = [
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36"
  ];

  return agents[Math.floor(Math.random() * agents.length)];
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const scrapeAmazonProduct = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-blink-features=AutomationControlled"
    ],
  });

  const page = await browser.newPage();

  // ----- Make browser look more human -----
  await page.setUserAgent(getRandomUserAgent());

  await page.setViewport({
    width: 1366,
    height: 768,
  });

  await page.setExtraHTTPHeaders({
    "accept-language": "en-US,en;q=0.9",
  });

  // Go to page
  await page.goto(url, {
    waitUntil: "networkidle2",
    timeout: 90000,
  });

  // Small human-like delay
  await sleep(3000);

  // Scroll a bit like a human
  await page.evaluate(() => {
    window.scrollBy(0, 300);
  });

  await sleep(2000);

  const productData = await page.evaluate(() => {
    const name =
      document.getElementById("productTitle")?.innerText?.trim() || null;

    let price =
      document.querySelector(".a-price-whole")?.innerText ||
      document.querySelector("#priceblock_ourprice")?.innerText ||
      document.querySelector("#priceblock_dealprice")?.innerText ||
      null;

    if (price) {
      price = price.replace(/[^0-9]/g, "");
    }

    const rating =
      document
        .querySelector(".a-icon-alt")
        ?.innerText?.split(" ")[0] || null;

    const image =
      document.getElementById("landingImage")?.src ||
      document.querySelector("#imgTagWrapperId img")?.src ||
      null;

    const description =
      document.querySelector("#feature-bullets ul")?.innerText?.trim() ||
      null;

    return {
      name,
      price: price ? Number(price) : null,
      rating: rating ? parseFloat(rating) : null,
      image_url: image,
      description,
      currency: "INR",
    };
  });

  await browser.close();

  if (!productData.name || !productData.price) {
    throw new Error(
      "Failed to scrape product data from Amazon. Page structure may have changed or access was restricted."
    );
  }

  return productData;
};
