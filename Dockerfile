FROM node:18.15.0 as node
WORKDIR /user-management-web
COPY . .
RUN npm install
RUN npm run build --prod
FROM nginx:alpine
COPY --from=node /user-management-web/dist/user-management-web /usr/share/nginx/html
