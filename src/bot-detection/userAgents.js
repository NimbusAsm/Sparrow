// List of supported user agents for bot detection
export default [
  "googlebot",
  "bingbot",
  "slackbot",
  "twitterbot",
  "facebookexternalhit",
  {
    name: "baidu",
    pattern: "baiduspider",
    UA: "Mozilla/5.0 (compatible; Baiduspider/2.0; +http://www.baidu.com/search/spider.html)",
  },
];
