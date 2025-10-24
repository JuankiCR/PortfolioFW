# --- build (Vite) ---
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN npm ci --no-audit --no-fund --registry=https://registry.npmjs.org/

COPY . .

RUN npm run build

FROM nginx:alpine

RUN printf "server { \
  listen 80; \
  server_name _; \
  root /usr/share/nginx/html; \
  index index.html; \
  location / { try_files \$uri /index.html; } \
}" > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]