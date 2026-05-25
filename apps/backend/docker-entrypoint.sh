#!/bin/sh
set -e

echo "Waiting for PostgreSQL..."
until pg_isready -h "${POSTGRES_HOST:-postgres}" -p "${POSTGRES_PORT:-5432}" -U "${POSTGRES_USER:-postgres}" > /dev/null 2>&1; do
  sleep 1
done

echo "Running migrations..."
npx prisma migrate deploy

echo "Seeding database..."
npx prisma db seed

echo "Starting backend..."
rm -rf dist 2>/dev/null || true
exec npm run start:dev
