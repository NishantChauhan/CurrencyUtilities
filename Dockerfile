FROM nginx:1.17.1-alpine AS PACKAGE
RUN rm -rf /usr/share/nginx/html/*
COPY ./.nginx /etc/nginx
COPY ./dist/CurrencyUtilities /usr/share/nginx/html
CMD envsubst '\$PORT' < /etc/nginx/nginx.heroku.conf > /etc/nginx/nginx.conf && nginx -g 'daemon off;'