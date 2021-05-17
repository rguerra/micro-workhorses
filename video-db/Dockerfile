
FROM node:12.18.1
#FROM node:12.18.1-alpine
ENV PORT=5000

COPY ./data ./data
COPY ./toolkit ./toolkit
COPY *.js ./
COPY *.json ./
RUN npm install 
RUN node src/index.js

