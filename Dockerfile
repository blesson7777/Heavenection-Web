FROM node:20.11.1-bookworm-slim AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/out ./out
COPY package.json ./
COPY static-server.js ./

EXPOSE 3000
CMD ["node", "static-server.js"]
