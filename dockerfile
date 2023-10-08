## create the file dockerfile
# Use an official Node.js runtime as a parent image
FROM node:18.9.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install

# Set the environment variable for the port
ENV PORT=3000

# Expose port 3000 to the outside world
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "start"]

