FROM node:18-alpine3.14
COPY . ./app
RUN mkdir ./app/dist/logs
RUN touch ./app/dist/logs/access.log
WORKDIR /app
RUN yarn install \
&& yarn build

ENTRYPOINT node ./dist/server.js