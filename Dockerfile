FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package file
COPY package*.json ./

# Install modules
RUN npm install --production

# Copy source code
COPY . .

# Expose Port 3000
EXPOSE 3000

# Start server
CMD [ "npm" , "server.js" ]