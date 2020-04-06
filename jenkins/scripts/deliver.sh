#!/usr/bin/env sh
docker login -u $DOCKER_HUB_CREDS_USR -p $DOCKER_HUB_CREDS_PSW

docker build -t nishantchouhan/currency-utilities-app:latest  .
docker tag nishantchouhan/currency-utilities-app:latest nishantchouhan/currency-utilities-app:$BUILD_NUMBER
docker push nishantchouhan/currency-utilities-app:latest
docker push nishantchouhan/currency-utilities-app:${BUILD_NUMBER}
docker logout
