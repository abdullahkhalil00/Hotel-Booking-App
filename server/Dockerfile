FROM node:22-alpine as Builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@12.0.1 && npm install    

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY . . 


EXPOSE 8000

CMD ["node", "server.js"]