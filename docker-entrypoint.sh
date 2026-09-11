#!/bin/sh
set -e

echo "🚀 Starting SATIT MCU System Container..."

# Ensure uploads directory is ready
mkdir -p /app/public/uploads 2>/dev/null || true

# Run database migrations if npx prisma is available
if [ "$RUN_MIGRATIONS" = "true" ]; then
  echo "📦 Running database migrations (prisma migrate deploy)..."
  npx prisma migrate deploy || echo "⚠️ Warning: Migration step skipped or failed, continuing..."
fi

exec "$@"
