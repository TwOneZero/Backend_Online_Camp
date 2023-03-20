FROM node:14

WORKDIR /testFolder/
COPY ./package.json /testFolder/
COPY ./package-lock.json /testFolder/
RUN npm install

COPY . /testFolder/

CMD node index.js
