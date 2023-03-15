FROM node:latest

WORKDIR /app

COPY package*.json ./

# Install from package-lock.json
# RUN npm ci -qy

RUN npm install 

COPY . .

EXPOSE 8080

CMD ["npm", "start"]