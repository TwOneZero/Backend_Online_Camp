FROM node:16
RUN mkdir /myapp
COPY ./package.json /myapp/
COPY ./yarn.lock /myapp/
WORKDIR /myapp/
RUN yarn install
COPY . /myapp/
RUN yarn run build
EXPOSE 3000
CMD [ "yarn", "run", "start:dev" ]