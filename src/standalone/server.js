// Server logic for standalone mode
const { createServer } = require("http");
const { prerender: _prerender } = require("../prerendering");

function start(config) {
  const { port, standalone } = config;

  const server = createServer(async (req, res) => {
    try {
      const url = standalone.targetUrl + req.url;
      console.log(`Received request for ${url}`);
      const content = await _prerender(url);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content);
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
