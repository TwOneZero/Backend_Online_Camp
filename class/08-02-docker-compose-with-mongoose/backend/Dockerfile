FROM node:14

WORKDIR /runningapp/
COPY ./package.json /runningapp/
COPY ./package-lock.json /runningapp/
RUN npm install

COPY . /runningapp/

CMD ["npm", "start"]
