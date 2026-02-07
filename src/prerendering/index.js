// Entry point for prerendering
import renderer from "./renderer";

async function prerender(url) {
  try {
    const content = await renderer.renderPage(url);
    return content;
  } catch (error) {
    console.error("Error during prerendering:", error);
    throw error;
  }
}

export default { prerender };
