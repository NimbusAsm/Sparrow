// Server logic for standalone mode
const { createServer } = require("http");
const { prerender: _prerender } = require("../prerendering");
const { getCache, setCache } = require("../caching");

function start(config) {
  const { port, standalone } = config;

  const server = createServer(async (req, res) => {
    try {
      const url = standalone.targetUrl + req.url;
      if (url !== standalone.targetUrl.trimEnd("/") + "/") {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Bad Request: Only root path is allowed in standalone mode.");
        console.log(
          `Received request for ${url}, but standalone mode only return request to ${standalone.targetUrl}.`,
        );
        return;
      }

      // Check cache first
      const cachedContent = getCache(standalone.targetUrl);
      if (cachedContent) {
        console.log("Cache hit for", standalone.targetUrl);
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(cachedContent);
        return;
      }

      // If not cached, prerender and cache the result
      const content = await _prerender(standalone.targetUrl);
      setCache(standalone.targetUrl, content, 300); // Cache for 5 minutes

      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);

      console.log("Prerendered and cached content for", standalone.targetUrl);
    } catch (error) {
      console.error("Error in standalone server:", error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Internal Server Error");
    }
  });

  server.listen(port, () => {
    console.log(`Standalone server running on port ${port}`);
  });
}

module.exports = { start };
