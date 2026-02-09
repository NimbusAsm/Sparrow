// Proxy logic for middleware mode
const { prerender: _prerender } = require("../prerendering");
const { isBot: _isBot } = require("../bot-detection");

async function handleBotRequest(req, res) {
  try {
    const url = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
    const content = await _prerender(url);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  } catch (error) {
    console.error("Error handling bot request:", error);
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("Internal Server Error");
  }
}

function isBot(userAgent) {
  return _isBot(userAgent);
}

module.exports = { handleBotRequest, isBot };
