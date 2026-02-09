// Entry point for prerendering
const { initBrowser, renderPage } = require("./renderer.js");

async function initPrerenderer() {
  await initBrowser();
}

async function prerender(url) {
  try {
    const content = await renderPage(url);
    return content;
  } catch (error) {
    console.error("Error during prerendering:", error);
    throw error;
  }
}

module.exports = { initPrerenderer, prerender };
