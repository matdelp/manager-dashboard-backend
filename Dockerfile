# ---------- DEVELOPMENT STAGE ----------
FROM node:lts-alpine3.19 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# ---------- PRODUCTION STAGE ----------
FROM node:lts-alpine3.19 AS production

WORKDIR /app

# Copy only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy compiled code from development stage
COPY --from=development /app/dist ./dist

# Optionally copy other required files like .env if needed
# COPY .env .env

# Run the application
CMD ["node", "dist/main"]