const ConfigProvider = require("./config/provider.js");
const middleware = require("./middleware");
const standalone = require("./standalone");
const express = require("express");
const { initPrerenderer } = require("./prerendering");

const app = express();
const configProvider = new ConfigProvider();
const config = configProvider.get();

console.log("Loaded configuration:", config);

(async () => {
  await initPrerenderer();

  if (config.mode === "middleware") {
    app.use(middleware);
    app.listen(config.port, () => {
      console.log(`Middleware server running on port ${config.port}`);
    });
  } else if (config.mode === "standalone") {
    standalone.startStandaloneMode(config);
  } else {
    console.error("Invalid mode specified in configuration.");
    process.exit(1);
  }
})();
