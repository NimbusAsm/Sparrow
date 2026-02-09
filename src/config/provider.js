const { existsSync } = require("fs");
const { resolve } = require("path");

class ConfigProvider {
  constructor() {
    const configPath = resolve(__dirname, "config.json");
    if (existsSync(configPath)) {
      this.config = require(configPath);
    } else {
      throw new Error(`Configuration file not found at ${configPath}`);
    }
  }

  get() {
    return this.config;
  }
}

module.exports = ConfigProvider;
