# Use Node.js as the base image
FROM node:14.16.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json ./

# Add the npm token dynamically for installing dependencies
ARG NPM_AUTH_TOKEN
RUN echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" > .npmrc

# Install dependencies
RUN npm install --legacy-peer-deps

# Remove the .npmrc to avoid leaving secrets in the final image
RUN rm .npmrc

# Copy the application code
COPY . .

# Build the application (if needed)
RUN npm run build

# Expose the default AngularJS port
EXPOSE 4200

# Start the AngularJS application with the specified command
CMD ["node", "--max_old_space_size=6128", "./node_modules/@angular/cli/bin/ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
