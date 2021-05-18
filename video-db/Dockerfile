

FROM node:12.18.1
#FROM node:12.18.1-alpine
ENV PORT=3000
#ENV PORT=5000
COPY ./data ./data
COPY ./toolkit ./toolkit
COPY package*.json ./
#COPY *.json ./
COPY *.js ./
WORKDIR /usr/src/app
RUN npm install 
#RUN npm install --only=production
COPY ./src ./src
CMD npm start

