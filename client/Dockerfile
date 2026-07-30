FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_CLERK_PUBLISHABLE_KEY
ARG VITE_BACKEND_URL
ARG VITE_CURRENCY

ENV VITE_CLERK_PUBLISHABLE_KEY=$VITE_CLERK_PUBLISHABLE_KEY
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_CURRENCY=$VITE_CURRENCY

RUN npm run build


FROM nginx:alpine


COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
