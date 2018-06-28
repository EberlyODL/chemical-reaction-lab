FROM node:10

RUN npm install -g parcel-bundler
WORKDIR /home/node/html
COPY package-lock.json package-lock.json
RUN npm install