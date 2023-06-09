FROM node:16

WORKDIR /stock-service/
COPY ./package.json /stock-service/
COPY ./yarn.lock /stock-service/
RUN yarn install

COPY . /stock-service/
CMD yarn start:dev