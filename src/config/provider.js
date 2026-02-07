import { existsSync } from "fs";
import { resolve } from "path";

class ConfigProvider {
  constructor() {
    const configPath = resolve(__dirname, "config.js");
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

export default ConfigProvider;
