# Sparrow 🐦

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> A high-performance SEO prerendering server designed to enhance search engine optimization for Single Page Applications (SPAs)

## 📋 Overview

Sparrow is a powerful prerendering solution that bridges the gap between modern Single Page Applications and search engine crawlers. By serving pre-rendered HTML snapshots to search engine bots while maintaining the dynamic, client-side experience for regular users, Sparrow ensures your SPA content is fully indexable and SEO-friendly.

### The Problem

Modern SPAs built with frameworks like React, Vue, Angular, or Svelte deliver exceptional user experiences but face significant SEO challenges:

- **Search engine crawlers** often struggle to execute JavaScript
- **Initial page loads** show minimal HTML, making content invisible to bots
- **Dynamic content** isn't properly indexed, leading to poor search rankings
- **Social media previews** fail to display proper meta tags and images

### The Solution

Sparrow intercepts requests from search engine bots and social media crawlers, renders the JavaScript-heavy pages in a headless browser, and serves fully-rendered HTML. This ensures:

- ✅ Complete content indexing by search engines
- ✅ Proper meta tags for social media sharing
- ✅ Improved search rankings and visibility
- ✅ Fast response times with intelligent caching
- ✅ No changes required to your existing SPA code

## 🚀 Key Features

- **🔍 Smart Bot Detection**: Automatically identifies search engine crawlers and social media bots
- **⚡ High Performance**: Optimized rendering pipeline with intelligent caching strategies
- **🎯 Selective Rendering**: Only prerenders when necessary, serving regular users directly
- **🔄 Cache Management**: Configurable cache invalidation and refresh policies
- **📊 Analytics Ready**: Built-in logging and monitoring capabilities
- **🛠️ Easy Integration**: Simple setup with minimal configuration required
- **🔒 Security First**: Protection against common vulnerabilities and abuse
- **📱 Mobile-Friendly**: Supports mobile user agents and responsive content

## 🏗️ How It Works

```
┌─────────────┐
│   Request   │
└──────┬──────┘
       │
       ▼
┌─────────────────┐      ┌──────────────┐
│  Is Bot/Crawler?├─Yes──▶│   Sparrow    │
└────────┬────────┘      │  Prerenderer │
         │               └──────┬───────┘
         No                     │
         │                      ▼
         │               ┌──────────────┐
         │               │ Render with  │
         │               │   Headless   │
         │               │   Browser    │
         │               └──────┬───────┘
         │                      │
         │                      ▼
         │               ┌──────────────┐
         │               │ Return Full  │
         │               │    HTML      │
         │               └──────┬───────┘
         │                      │
         ▼                      │
┌─────────────────┐            │
│  Serve Original │◀───────────┘
│   SPA Content   │
└─────────────────┘
```

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Your SPA application deployed and accessible

### Quick Start

```bash
# Clone the repository
git clone https://github.com/NimbusAsm/Sparrow.git

# Navigate to the directory
cd Sparrow

# Install dependencies
npm install

# Configure your settings
cp config.example.json config.json

# Start the server
npm start
```

## ⚙️ Configuration

Create a `config.json` file in the root directory:

```json
{
  "port": 3000,
  "targetUrl": "https://your-spa-website.com",
  "cache": {
    "enabled": true,
    "ttl": 3600,
    "maxSize": 1000
  },
  "rendering": {
    "timeout": 30000,
    "waitUntil": "networkidle0"
  },
  "bots": {
    "userAgents": [
      "googlebot",
      "bingbot",
      "slackbot",
      "twitterbot",
      "facebookexternalhit"
    ]
  }
}
```

### Configuration Options

| Option | Description | Default |
|--------|-------------|---------|
| `port` | Server port | `3000` |
| `targetUrl` | Your SPA URL to prerender | Required |
| `cache.enabled` | Enable response caching | `true` |
| `cache.ttl` | Cache time-to-live (seconds) | `3600` |
| `cache.maxSize` | Maximum cache entries | `1000` |
| `rendering.timeout` | Page render timeout (ms) | `30000` |
| `rendering.waitUntil` | Wait condition for rendering | `networkidle0` |

## 🔧 Usage

### As a Standalone Server

Run Sparrow as a standalone prerendering server:

```bash
npm start
```

Then configure your web server (Nginx, Apache, etc.) to proxy bot requests to Sparrow.

### Nginx Configuration Example

```nginx
location / {
    if ($http_user_agent ~* "googlebot|bingbot|slackbot|twitterbot|facebookexternalhit") {
        proxy_pass http://localhost:3000;
    }
    # Regular traffic goes to your SPA
    try_files $uri $uri/ /index.html;
}
```

### Docker Deployment

```bash
# Build the Docker image
docker build -t sparrow .

# Run the container
docker run -d -p 3000:3000 -v $(pwd)/config.json:/app/config.json sparrow
```

## 📊 Monitoring

Sparrow provides built-in monitoring endpoints:

- `GET /health` - Health check endpoint
- `GET /metrics` - Performance and cache metrics
- `GET /cache/stats` - Cache statistics

## 🔍 Supported Bots

Sparrow automatically detects and prerenders for:

- **Search Engines**: Google, Bing, Yahoo, DuckDuckGo, Baidu, Yandex
- **Social Media**: Facebook, Twitter, LinkedIn, Slack, Discord
- **Messaging Apps**: WhatsApp, Telegram
- **Others**: Pinterest, Reddit, and more

## 🛡️ Security

Sparrow includes several security features:

- Rate limiting to prevent abuse
- Request validation and sanitization
- Configurable allowed domains
- Protection against SSRF attacks
- Secure header handling

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our coding standards and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with modern Node.js and Puppeteer/Playwright
- Inspired by the need for better SPA SEO solutions
- Community-driven development and feedback

## 📞 Support

- 🐛 **Issues**: [GitHub Issues](https://github.com/NimbusAsm/Sparrow/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/NimbusAsm/Sparrow/discussions)
- 📧 **Email**: support@sparrow-prerender.dev

## 🗺️ Roadmap

- [ ] Support for more rendering engines
- [ ] Advanced caching strategies (Redis, Memcached)
- [ ] Cloud deployment templates (AWS, GCP, Azure)
- [ ] Real-time cache invalidation webhooks
- [ ] Performance analytics dashboard
- [ ] Plugin system for extensibility

---

Made with ❤️ by the Sparrow team
