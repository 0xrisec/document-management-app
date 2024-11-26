# Use a lightweight Node.js base image
FROM node:18-alpine
# Set the working directory
WORKDIR /usr/src/app
# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the built application

COPY dist ./dist

# Copy the env variables
COPY .env ./
# Install dependencies
RUN npm install
# Expose the application port
EXPOSE 3000
# Start the Nest.js application
CMD ["node", "dist/main.js"]



# docker build -t doc-pro .
# docker tag doc-pro:latest vikas9012/doc-pro:1.0.1
# docker push vikas9012/doc-pro:1.0.1
# docker run -d -p 8080:8080 a6682ac84c519ef52daf34e7d11aeaf725b4563f7a8dc1b9a828c43042892037
