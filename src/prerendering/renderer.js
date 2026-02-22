// Headless browser rendering logic
const puppeteer = require("puppeteer");

let browserInstance = null;

async function initBrowser() {
  if (!browserInstance) {
    browserInstance = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      ignoreHTTPSErrors: true,
      headless: true,
    });
  }
}

async function renderPage(url) {
  if (!browserInstance) {
    throw new Error(
      "Browser instance not initialized. Call initBrowser first.",
    );
  }

  const page = await browserInstance.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    const content = await page.content();
    return content;
  } catch (error) {
    console.error("Failed to render page:", error);
    throw error;
  } finally {
    await page.close();
  }
}

async function closeBrowser() {
  if (browserInstance) {
    await browserInstance.close();
    browserInstance = null;
  }
}

module.exports = { initBrowser, renderPage, closeBrowser };
