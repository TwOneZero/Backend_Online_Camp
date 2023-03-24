FROM node:14

WORKDIR /starbucksApi/
COPY ./package.json /starbucksApi/
COPY ./package-lock.json /starbucksApi/
RUN npm install

COPY . /starbucksApi/

CMD ["npm", "run", "dev"]