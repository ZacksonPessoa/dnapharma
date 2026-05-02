FROM node:22-alpine

RUN apk update \
  && apk upgrade --no-cache \
  && apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

# Prisma precisa de DATABASE_URL na build; valor só para `prisma generate` (runtime usa `-e`/compose).
RUN DATABASE_URL="postgresql://user:password@localhost:5432/placeholder" npx prisma generate

EXPOSE 3333

CMD ["node", "src/server.js"]
