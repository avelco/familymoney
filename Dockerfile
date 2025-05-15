FROM node:22-slim

# Install build tools for native addons
RUN apt-get update \
 && apt-get install -y python3 build-essential \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN npm install -g pnpm@latest

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN npx prisma generate

EXPOSE 5173
CMD ["pnpm", "run", "dev-prod"]
