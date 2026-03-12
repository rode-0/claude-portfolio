# Stage: Dev (used by docker-compose for development)
FROM node:20-alpine AS dev

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY src ./src
COPY tsconfig.json ./

EXPOSE 3001

CMD ["npm", "run", "dev"]

# Stage: Build
FROM dev AS builder

RUN npm run build

# Stage: Production
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3001

CMD ["node", "dist/index.js"]
