# ====================================================
# SATIT MCU System - Multi-Stage Production Dockerfile
# ====================================================

# 1. Base stage
FROM node:20-alpine AS base
RUN apk add --no-cache libc6-compat openssl
WORKDIR /app

# 2. Dependencies stage
FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci --legacy-peer-deps --ignore-scripts

# 3. Builder stage
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production
ENV DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ums_build_dummy"
ENV AUTH_SECRET="dummy-build-time-secret-at-least-32-characters-long"
ENV APP_URL="http://localhost:3010"

RUN npx prisma generate
RUN npm run build

# 4. Production runner stage
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Security: Create non-root system user and group (Least Privilege)
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public static assets and prepare uploads volume target
COPY --from=builder /app/public ./public
RUN mkdir -p /app/public/uploads && chown -R nextjs:nodejs /app/public/uploads

# Copy Next.js standalone build artifacts
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy prisma schema for runtime schema queries
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma

# Copy and setup entrypoint script
COPY --chown=nextjs:nodejs docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

USER nextjs

EXPOSE 3000

ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["node", "server.js"]
