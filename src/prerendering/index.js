// Entry point for prerendering
const renderer = require("./renderer.js");

async function prerender(url) {
  try {
    const content = await renderer.renderPage(url);
    return content;
  } catch (error) {
    console.error("Error during prerendering:", error);
    throw error;
  }
}

module.exports = { prerender };
