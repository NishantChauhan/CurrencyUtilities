FROM node:10-alpine as BUILD
WORKDIR /currency-app
COPY . /currency-app
ARG BACK_END_API_ENDPOINT
RUN npm ci
RUN npm run build

FROM nginx:1.17.1-alpine AS PACKAGE
RUN rm -rf /usr/share/nginx/html/*
COPY ./.nginx /etc/nginx
COPY --from=BUILD /currency-app/dist/CurrencyUtilities /usr/share/nginx/html
CMD envsubst '\$PORT' < /etc/nginx/nginx.heroku.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'
