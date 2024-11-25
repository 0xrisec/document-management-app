# Use a lightweight Node.js base image
FROM node:18-alpine
# Set the working directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./
# COPY .env ./
# Install dependencies
RUN npm install
# Copy the built application
COPY dist ./dist
# Expose the application port
EXPOSE 3000
# Start the Nest.js application
CMD ["node", "dist/main.js"]