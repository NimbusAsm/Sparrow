# Use the official Node.js image as the base image
FROM node:20-bookworm

# Set the working directory inside the container
WORKDIR /app

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Copy package.json and package-lock.json to the working directory
COPY ./package*.json ./
COPY ./pnpm-lock.yaml ./

# Install dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --force

## Install dependencies that chromium required
RUN apt-get update && apt-get install -y \
    libnspr4 \
    libnss3 \
    libatk-bridge2.0-0 \
    libdrm2 \
    libxkbcommon0 \
    libgbm1 \
    libasound2 \
    libxshmfence1 \
    libcups2 \
    libatk1.0-0 \
    libgtk-3-0 \
    libpango-1.0-0 \
    libcairo2 \
    libxcomposite1 \
    libxdamage1 \
    libxfixes3 \
    libxrandr2 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

RUN npx puppeteer browsers install chrome

# Copy the rest of the application code to the working directory
COPY ./src ./src

# Expose the port specified in the configuration (default: 7700)
EXPOSE 7700

# Command to run the application
CMD ["node", "/app/src/app.js"]
