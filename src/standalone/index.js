// Standalone entry point
const { start } = require("./server.js");

function startStandaloneMode(config) {
  start(config);
}

module.exports = { startStandaloneMode };
