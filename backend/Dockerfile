# Node.js version
FROM node:12

# Create working directory
WORKDIR /usr/src/weatherapp_backend

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle source
COPY . .

# Expose the port 9000
EXPOSE 9000

# Start the application
CMD [ "npm", "start" ]