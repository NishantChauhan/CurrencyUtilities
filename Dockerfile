# escape=`
FROM node:10-alpine as BUILD
RUN apk add --no-cache nodejs nodejs-npm bash nss`
    && apk upgrade --no-cache --available
WORKDIR /currency-app
COPY . /currency-app
RUN npm ci && npm run build

FROM nginx:1.17.1-alpine AS PACKAGE
RUN rm -rf /usr/share/nginx/html/*
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=BUILD /currency-app/dist/CurrencyUtilities /usr/share/nginx/html
CMD envsubst '\$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
