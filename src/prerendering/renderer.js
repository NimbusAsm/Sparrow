// Headless browser rendering logic
import { launch } from "puppeteer";

async function renderPage(url) {
  const browser = await launch();
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    const content = await page.content();
    return content;
  } catch (error) {
    console.error("Failed to render page:", error);
    throw error;
  } finally {
    await browser.close();
  }
}

export default { renderPage };
