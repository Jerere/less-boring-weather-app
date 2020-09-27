# Node.js version
FROM node:12

# Create working directory
WORKDIR /usr/src/weatherapp_frontend

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle source
COPY . .

# Expose the port 8000
EXPOSE 8000

# Start the application
CMD [ "npm", "start" ]