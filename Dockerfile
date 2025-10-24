# --- build (Vite) ---
FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./

RUN printf "registry=https://registry.npmjs.org/\nalways-auth=false\n" > /root/.npmrc \
  && npm config delete //registry.npmjs.org/:_authToken || true \
  && npm config set registry https://registry.npmjs.org/ \
  && npm ci --no-audit --no-fund

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
