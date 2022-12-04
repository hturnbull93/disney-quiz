FROM node:18-alpine

EXPOSE 3000

WORKDIR /home/node/app

COPY package.json yarn.lock ./

RUN yarn install

# COPY . .