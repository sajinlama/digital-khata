FROM node:20.12.0-alpine3.19

ARG DATABASE_URL

ARG JWT_SECRET

ARG UPSTASH_REDIS_REST_URL

ARG UPSTASH_REDIS_REST_TOKEN

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm intall

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
