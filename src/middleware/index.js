// Middleware entry point
const { isBot, handleBotRequest } = require("./proxy.js");

function middleware(req, res, next) {
  if (isBot(req.headers["user-agent"])) {
    handleBotRequest(req, res);
  } else {
    next();
  }
}

module.exports = middleware;
