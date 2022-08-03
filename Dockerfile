FROM node:lts-alpine

WORKDIR /usr/src/app

COPY ./frontend/package.json ./frontend/tsconfig.json ./frontend/yarn.lock /usr/src/app/frontend/
RUN cd frontend && npm install

COPY ./api/package.json ./api/tsconfig.json /usr/src/app/api/
RUN cd api && npm install

COPY ./core/ /usr/src/app/core
COPY ./frontend /usr/src/app/frontend
COPY ./api /usr/src/app/api
COPY ./Makefile /usr/src/app

EXPOSE 3000
EXPOSE 5000




