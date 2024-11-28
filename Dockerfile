# Use Node.js as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the application (if needed)
# RUN npm run build (comment or uncomment if required)

# Expose the default AngularJS port
EXPOSE 4200

# Start the AngularJS application with the specified command
CMD ["node", "--max_old_space_size=6128", "./node_modules/@angular/cli/bin/ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
