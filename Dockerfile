
FROM node:18.12.0 AS build-step

WORKDIR /AngualrProject
#RUN npm install -g @angular/cli

COPY . .
RUN npm install

RUN npm run build --prod

FROM nginx:1.20.1
COPY --from=build-step /app/dist/ecommerce /usr/share/nginx/html
