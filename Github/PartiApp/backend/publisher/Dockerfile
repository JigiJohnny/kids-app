# backend/app/Dockerfile
FROM node:20

# Arbeitsverzeichnis im Container
WORKDIR /usr/src/app

# Kopiere package.json + install dependencies
COPY package*.json ./
RUN npm install

# Kopiere restliche App
COPY . .

# Starte dein Script
CMD ["node", "mqttPublisher.js"]
