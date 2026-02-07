import { launch } from "puppeteer";
import { createServer } from "http";

(async () => {
  // Launch Puppeteer browser
  const browser = await launch();
  const page = await browser.newPage();

  // Navigate to the SPA website
  const url = "https://www.nimatattic.email";
  await page.goto(url, { waitUntil: "networkidle0" });

  // Fetch the rendered content
  const content = await page.content();

  // Close the browser
  await browser.close();

  // Serve the fetched content on localhost:39101
  const server = createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });

  server.listen(39101, () => {
    console.log("Server is running at http://localhost:39101");
  });
})();
