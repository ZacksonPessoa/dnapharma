FROM node:22-alpine

RUN apk update \
  && apk upgrade --no-cache \
  && apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
