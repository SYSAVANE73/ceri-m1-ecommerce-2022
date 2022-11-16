
FROM node:18.12.0 AS node

WORKDIR /AngualrProject

#RUN npm install -g @angular/cli

COPY /AngualrProject/package.json .

COPY /AngualrProject /AngualrProject

RUN npm install


RUN npm run build --prod

FROM nginx:alpine

#WORKDIR /usr/share/nginx/html
COPY --from=node /AngualrProject/dist/ecommerce /usr/share/nginx/html
