# Use small Node.js image
FROM node:lts-alpine3.19

# Create and set working directory
WORKDIR /usr/src/app

# Copy only package.json first for dependency install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Build TypeScript (if you compile for production)
RUN npm run build

# Expose app port (change if needed)
EXPOSE 5000

# Run the app in production mode by default
CMD ["npm", "run", "start"]
