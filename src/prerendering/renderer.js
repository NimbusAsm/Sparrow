// Headless browser rendering logic
const { launch } = require("puppeteer");

async function renderPage(url) {
  const browser = await launch();
  const page = await browser.newPage();

  let content = null;

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    content = await page.content();
  } catch (error) {
    console.error("Failed to render page:", error);
    throw error;
  } finally {
    await browser.close();
  }

  return content;
}

module.exports = { renderPage };
