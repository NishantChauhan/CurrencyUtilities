# escape=`
FROM node:10-alpine as BUILD
ENV CHROME_BIN=/usr/bin/chromium-browser CHROME_DRIVER=/usr/bin/chromedriver
RUN apk add --no-cache nodejs nodejs-npm bash chromium nss chromium-chromedriver `
    && apk upgrade --no-cache --available
WORKDIR /currency-app
COPY . /currency-app
RUN npm install && npm test && npm run build

FROM nginx:1.17.1-alpine AS PACKAGE
COPY --from=BUILD /currency-app/dist/CurrencyUtilities /usr/share/nginx/html
