// Entry point for bot detection
import { some } from "./userAgents";

function isBot(userAgent) {
  if (!userAgent) return false;

  return some((bot) => {
    if (typeof bot === "string") {
      return userAgent.toLowerCase().includes(bot.toLowerCase());
    } else if (bot.pattern) {
      const regex = new RegExp(bot.pattern, "i");
      return regex.test(userAgent);
    }
    return false;
  });
}

export default { isBot };
