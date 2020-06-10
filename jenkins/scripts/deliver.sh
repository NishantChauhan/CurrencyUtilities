#!/usr/bin/env sh
docker login -u $DOCKER_HUB_CREDS_USR -p $DOCKER_HUB_CREDS_PSW

docker build --build-arg BACK_END_API_ENDPOINT=http://localhost:5000/api/v1 -t nishantchouhan/currency-utilities-app:latest  .
docker tag nishantchouhan/currency-utilities-app:latest nishantchouhan/currency-utilities-app:jenkins-$BUILD_NUMBER
docker push nishantchouhan/currency-utilities-app:latest
docker push nishantchouhan/currency-utilities-app:jenkins-${BUILD_NUMBER}
docker logout
