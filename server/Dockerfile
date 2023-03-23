FROM node:latest

# Get the latest version of Playwright
FROM mcr.microsoft.com/playwright:focal

WORKDIR /app

# Set the environment path to node_modules/.bin
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

# Install from package-lock.json
# RUN npm ci -qy

# Get the needed libraries to run Playwright
RUN apt-get update && apt-get -y install libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 libatspi2.0-0 libxcomposite1 libxdamage1 libxfixes3 libxrandr2 libgbm1 libdrm2 libxkbcommon0 libasound2

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "start"]