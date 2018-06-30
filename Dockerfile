FROM node:10

RUN npm install -g parcel-bundler
WORKDIR /home/node/html
COPY package.json package.json
RUN npm install