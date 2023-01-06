
FROM node:18.12.0 AS node

WORKDIR /AngualrProject

#RUN npm install -g @angular/cli

COPY /AngualrProject/package.json .

COPY /AngualrProject /AngualrProject

RUN npm install


RUN npm run build --prod

# server environment
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/configfile.template
#WORKDIR /usr/share/nginx/html
COPY --from=node /AngualrProject/dist/ecommerce /usr/share/nginx/html

ENV PORT 8000
ENV HOST 0.0.0.0
EXPOSE 8000
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"
