FROM node:16
RUN mkdir -p /var/app
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start:dev" ]
# # Use the official Node.js 14 image as the base image
# FROM node:14

# # Set the working directory inside the container to /app
# WORKDIR /app

# # Copy the package.json and package-lock.json files to the container
# COPY package*.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code to the container
# COPY . .

# # Build the application
# RUN npm run build:prod

# # Expose port 3000 to the host
# EXPOSE 3000

# # Start the application
# CMD [ "npm", "run", "start:prod" ]
