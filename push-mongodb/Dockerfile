FROM node:12.18.1
#FROM node:12.18.1-alpine
ENV PORT=3000

RUN apt-get update && \
	apt-get install -y --no-install-recommends \
	neovim \
	mongodb

WORKDIR /usr/src/app
#ENV PORT=5000
COPY ./data ./data
COPY ./toolkit ./toolkit
COPY package*.json ./
#COPY *.json ./
COPY *.js ./
COPY *.sh ./
RUN npm install 
#RUN npm install --only=production
COPY ./src ./src
CMD npm start

