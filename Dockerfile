# Stage 1: install dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
ARG NODE_ENV
ENV NODE_ENV $NODE_ENV
RUN npm install

# Stage 2: build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
COPY migrations ./migrations
COPY package.json next.config.js tsconfig.json drizzle.config.ts ./
COPY tailwind.config.js tailwind.config.ts components.json ./
RUN npm run build

# Stage 3: run
FROM node:18-alpine
WORKDIR /app

# Set environment variables for production
ENV NODE_ENV production

# Copy the production build from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

# Include the necessary config files for runtime
COPY --from=builder /app/next.config.js ./  
COPY --from=builder /app/drizzle.config.ts ./  
COPY --from=builder /app/migrations ./migrations

# Expose port 3000 for the Next.js app
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]
