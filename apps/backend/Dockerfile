FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

RUN npx prisma generate

EXPOSE 3003

ENTRYPOINT ["sh", "docker-entrypoint.sh"]
