FROM node:16
RUN mkdir /auth-service
COPY ./package.json /auth-service/
COPY ./yarn.lock /auth-service/
WORKDIR /auth-service/
RUN yarn install
COPY . /auth-service/
RUN yarn run build

CMD yarn start:dev